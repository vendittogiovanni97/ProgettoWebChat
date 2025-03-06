// WebSocketService.ts
import WebSocket from "ws";
import { EventEmitter } from "events";
import WebsocketMessage from "../types/wsMessagetype";

export class WebRtcSocketService extends EventEmitter {
  /*EventEmitter è una classe fornita dal modulo events di Node.js che implementa il pattern Observer (o Publish-Subscribe). Questa classe permette di:
Emettere eventi - Un oggetto può segnalare che è successo qualcosa di interessante
Sottoscriversi a eventi - Altri oggetti possono "ascoltare" questi eventi e reagire quando accadono*/
  private connections: Map<string, WebSocket> = new Map();
  private sessions: Map<string, Set<string>> = new Map();

  constructor() {
    super();
    console.log("WebSocket Service initialized");
  }

  public handleMessage(ws: WebSocket, message: WebsocketMessage): void {
    switch (message.type) {
      case "new-user":
        this.handleNewUser(ws, message);
        break;
      case "join-call":
        this.handlejoinCall(message);
        break;
      case "leave-call":
        this.handleLeaveCall(message);
        break;
      case "answer":
      case "ice-candidate":
      case "offer":
        this.handleWebRTCSignaling(message);
        break;
      default:
        console.log("Tipo di messaggio non riconosciuto:", message.type);
        break;
    }
  }

  public handleNewUser(ws: WebSocket, message: WebsocketMessage): void {
    console.log(`Registrazione nuovo utente: ${message.username}`);
    const existingWs = this.connections.get(message.username);
    // Se l'utente è già connesso, aggiorniamo la connessione
    if (existingWs) {
      console.log(
        `L'utente ${message.username} è già connesso, aggiornamento connessione`
      );
    }
    this.connections.set(message.username, ws);
    console.log("Connessioni attive:", Array.from(this.connections.keys()));
    // Emetti evento per potenziale integrazione con REST API
    this.emit("user-connected", message.username);
  }

  public handlejoinCall(message: WebsocketMessage): void {
    // Implementazione della gestione join call
  }

  public handleLeaveCall(message: WebsocketMessage): void {
    // Implementazione della gestione leave call
  }

  public handleWebRTCSignaling(message: WebsocketMessage): void {
    // Implementazione della gestione WebRTC signaling
  }

  public findUsernameByConnection(ws: WebSocket): string | undefined {
    for (const [username, socket] of this.connections.entries()) {
      if (socket === ws) {
        return username;
      }
    }
    return undefined;
  }

  public logoutUser(username: string): void {
    console.log(`Logout dell'utente ${username}`);
    // Se esiste una connessione WebSocket aperta per questo utente, la chiudiamo
    const wss = this.connections.get(username);
    if (wss && wss.readyState === WebSocket.OPEN) {
      wss.close();
    }
    // Rimuoviamo la connessione dalla mappa
    this.connections.delete(username);

    // Cerchiamo in quale sessione è presente l'utente
    for (const [sessionId, participants] of this.sessions.entries()) {
      if (participants.has(username)) {
        console.log(
          `L'utente ${username} era nella sessione ${sessionId}. Chiudiamo la sessione.`
        );
        // Notifichiamo agli altri partecipanti che la sessione è terminata
        participants.forEach((user: string) => {
          if (user !== username) {
            const userSocket = this.connections.get(user);
            if (userSocket && userSocket.readyState === WebSocket.OPEN) {
              const message = {
                type: "session-ended",
                sessionId: sessionId,
                user: username,
                message: `La sessione è terminata perché ${username} ha effettuato il logout.`,
              };
              userSocket.send(JSON.stringify(message));
            }
          }
        });
        // Rimuoviamo la sessione dalla mappa
        this.sessions.delete(sessionId);
      }
    }
  }

  public broadcastSession(
    sessionId: string,
    message: any,
    sender: string
  ): void {
    const sessionUsers = this.sessions.get(sessionId);
    console.log("sessionUsers", sessionUsers);

    if (!sessionUsers) {
      console.log("session non trovata", sessionId);
      return;
    }

    sessionUsers.forEach((user: string) => {
      console.log("user", user, "sender", sender);
      if (user !== sender) {
        const userSocket = this.connections.get(user);
        if (userSocket?.readyState === WebSocket.OPEN) {
          const messageConstructor = { ...message, sender: sender };
          //console.log('messageConstructor', messageConstructor)
          userSocket.send(JSON.stringify(messageConstructor));
        }
      }
    });
  }

  public getSessionId(username: string): string | undefined {
    console.log("sto per ottenere la session id per", username);
    for (const [key, value] of this.sessions.entries()) {
      if (value.has(username)) {
        console.log("session id trovata", key);
        return key;
      }
    }
    console.log("session id non trovata");
    return undefined;
  }

  // Metodi per l'accesso e la manipolazione delle mappe
  public getConnections(): Map<string, WebSocket> {
    return this.connections;
  }

  public getSessions(): Map<string, Set<string>> {
    return this.sessions;
  }

  public addToSession(sessionId: string, username: string): void {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = new Set<string>();
      this.sessions.set(sessionId, session);
    }
    session.add(username);
    console.log(`Utente ${username} aggiunto alla sessione ${sessionId}`);
  }
}
