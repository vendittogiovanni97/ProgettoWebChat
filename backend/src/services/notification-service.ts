import { WebSocket } from 'ws';

export type NotificationMessage = {
  type: string;
  timestamp: number;
}

export type NewMessage = NotificationMessage & { //eventualmente da implementare enum per gestire più type
  type: 'new-message';
  content: string;
  username: string;
  userId: number;
}//eventualmente implementare recerver per avere gestione di arrey di destinatari

export interface INotificationServer {    ///serve per definire metodi e proprieta che sono necessari alla classe per funzionare se no si rompe
  connect(clientId: string, userId: number, ws: WebSocket): void;

  sendNotification(clientId: string, message: NotificationMessage): void;
  notifynewMessage(clientId: string, newMessage: NewMessage): void;
  disconnect(clientId: string): void;

  sendNotificationUser(userId: number, message: NotificationMessage): void;
  notifynewMessageUser(userId: number, newMessage: NewMessage): void;
  disconnectUser(userId: number): void;
  
  broadcastNotification(message: NotificationMessage): void;
  broadcastnewMessage(newMessage: NewMessage): void;
  disconnectAll(): void;
}

export class NotificationServer implements INotificationServer {
  private clients: Map<string, WebSocket> = new Map();
  private userClients: Map<number, string[]> = new Map();
  // TODO: Utilizzare questa terza mappa per evitare i cicli for nelle disconnect
  private clientUsers: Map<string, number> = new Map();

  connect(clientId: string, userId: number, ws: WebSocket): void {
    this.clients.set(clientId, ws);

    const uc = this.userClients.get(userId)
    if (uc !== undefined) {
      uc.push(clientId);
    } else {
      this.userClients.set(userId, [clientId]);
    }
  }

  sendNotification(clientId: string, message: NotificationMessage): void {
    const ws = this.clients.get(clientId);
    ws?.send(JSON.stringify(message));
  }

  notifynewMessage(clientId: string, newMessage: NewMessage): void {
    const notification: NewMessage = {
      type: 'new-message',
      userId: newMessage.userId,
      content: newMessage.content,
      username: newMessage.username,
      timestamp: new Date().valueOf()
    }

    this.sendNotification(clientId, notification);
  }

  disconnect(clientId: string): void {
    const ws = this.clients.get(clientId);
    ws?.close();

    this.clients.delete(clientId);

    let found = false;
    for (const userId of this.userClients.keys()) {
      const uc = this.userClients.get(userId);

      if (uc !== undefined) {
        const index = uc.indexOf(clientId);
        if (index > -1) {
          found = true;
          uc.splice(index, 1);
        }

        if (uc.length > 0) {
          this.userClients.delete(userId);
        }
      }

      if (found) {
        break;
      }

    }
  }

  sendNotificationUser(userId: number, message: NotificationMessage): void {
    const uc = this.userClients.get(userId);

    if (uc !== undefined) {
      for (const clientId of uc) {
        this.sendNotification(clientId, message);
      }
    }
  }

  notifynewMessageUser(userId: number, newMessage: NewMessage): void {
    const uc = this.userClients.get(userId);

    if (uc !== undefined) {
      for (const clientId of uc) {
        this.notifynewMessage(clientId, newMessage);
      }
    }
  }

  disconnectUser(userId: number): void {
    const uc = this.userClients.get(userId);

    if (uc !== undefined) {
      for (const clientId of uc) {
        const ws = this.clients.get(clientId);
        ws?.close();
        this.clients.delete(clientId)
      }

      this.userClients.delete(userId);
    }
  }

  broadcastNotification(message: NotificationMessage): void {
    const clients = this.clients.keys();
    for (const clientId of clients) {
      this.sendNotification(clientId, message);
    }
  }

  broadcastnewMessage(newMessage: NewMessage): void {
    const clients = this.clients.keys();
    for (const clientId of clients) {
      this.notifynewMessage(clientId, newMessage);
    }
  }

  disconnectAll(): void {
    for (const clientId of this.clients.keys()) {
      const ws = this.clients.get(clientId);
      ws?.close();
    }

    this.clients.clear();
    this.userClients.clear();
  }
  
}