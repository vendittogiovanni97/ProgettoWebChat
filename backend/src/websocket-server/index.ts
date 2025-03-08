import { Server } from "http";
import { WebRtcSocketService } from "../services/WebRtcsocketService";
import WebSocket, { WebSocketServer } from "ws";
import WebsocketMessage from "../types/wsMessagetype";
import { Request } from "express";
import { oggi } from "../configuration/time.config";


export class WebSocketManager {
  private wss: WebSocketServer;
  private service : WebRtcSocketService
  clientCounter: number;
  clients: Map<number, any>;

  constructor(server: Server) {
    console.log("istanza del webSocketManager");
    this.wss = new WebSocket.Server({ server, path:"/" });
    this.service = new WebRtcSocketService();
    this.clients = new Map(); //Qua mappiamo i client con un id per tenerli traccia
    this.clientCounter = 0;
    this.initialize();
  }
   initialize(): void {
    console.log("Inizializzazione WebSocket server");
    this.wss.on("connection", this.handleConnection.bind(this));
  }
  private handleConnection(ws: WebSocket, request: Request): void {
    const clientId = ++this.clientCounter;
    this.clients.set(clientId, {
      ws,
      ip: request.socket.remoteAddress,
      connectTime: oggi
    })
    console.log(`Nuova connessione WebSocket stabilita, nuovo client ${clientId}, connesso da ${request.socket.remoteAddress}`);

    ws.on("message", (messageBuffer) => {
      try {
        const message = JSON.parse(
          messageBuffer.toString()
        ) as WebsocketMessage;
        console.log("Messaggio ricevuto:", message);
        this.service.handleMessage(ws, message);
      } catch (error) {
        console.error("Errore nella gestione del messaggio:", error);
      }
    });
    ws.on("close", () => {
      console.log("Connessione WebSocket chiusa");
      // Trova e rimuovi l'utente che ha chiuso la connessione
      const username = this.service.findUsernameByConnection(ws);
      if (username) {
        this.service.logoutUser(username);
      }
    });
  }
}
