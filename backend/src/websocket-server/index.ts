import { Server } from "http";
import { WebRtcSocketService } from "../services/WebRtcsocketService";
import WebSocket from "ws";
import WebsocketMessage from "../types/wsMessagetype";

export class WebSocketManager {
  private wss: WebSocket.Server;
  private service : WebRtcSocketService

  constructor(server: Server) {
    console.log("istanza del webSocketManager");
    this.wss = new WebSocket.Server({ server });
    this.service = new WebRtcSocketService();
    this.initialize();
  }
  public initialize(): void {
    console.log("Inizializzazione WebSocket server");
    this.wss.on("connection", this.handleConnection.bind(this));
  }
  private handleConnection(ws: WebSocket): void {
    console.log("Nuova connessione WebSocket stabilita");

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
