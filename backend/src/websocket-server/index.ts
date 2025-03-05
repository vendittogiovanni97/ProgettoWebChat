import { Server } from "http";
import WebSocket from "ws";

export class WebSocketManager {
    private ws: WebSocket.Server
    private connections: Map<string, WebSocket> = new Map()
    private sessions: Map<string, Set<string>> = new Map()


    constructor(server: Server) {
        console.log('istanza del webSocketManager')
        this.ws = new WebSocket.Server({ server })
        this.initialize()
    }

    public initialize() {
        console.log('chiamo initialize')
        this.ws.on('connection', (ws: WebSocket) => {
            console.log('nuova connessione')
            try {        ////////////gestione webrtc
                ws.on('message', (messageBuffer) => {
                    const message = JSON.parse(messageBuffer.toString())
                    console.log('messaggio ricevuto', message)

                    switch (message.type) {  ////////eventualmente da implementare metodi a posto di this.stocazz
                        case 'new-user': {
                            console.log(`il type è ${message.type}`, message)
                            this.connections.set(message.username, ws)
                            console.log('connessioni attive', Array.from(this.connections.keys()))
                        }
                            break
                        case 'join-call': {
                            console.log(`il type è ${message.type}`, message)
                            const existSession = this.getSessionId(message.username)
                            let sessionId = existSession || message.receiver

                            if (!this.sessions.has(sessionId)) {
                                console.log('creo la session', sessionId)
                                this.sessions.set(sessionId, new Set())
                            }

                            const sessionUsers = this.sessions.get(sessionId)!
                            sessionUsers.add(message.username)
                            sessionUsers.add(message.receiver)
                            console.log('sessionUsers', Array.from(sessionUsers))
                            this.broadcastSession(sessionId, {
                                type: "new-participant",
                                sender: message.username,
                                participants: Array.from(sessionUsers)
                            }, message.username)
                            break
                        }
                        case 'leave-call': {
                            this.logoutUser(message.username)
                            break
                        }
                        case 'offer':
                        case 'answer':
                        case 'ice-candidate': {
                            const sessionId = this.getSessionId(message.username)
                            this.broadcastSession(sessionId!, message, message.username)
                        }
                            break

                        default: {
                            console.log('il type non corrisponde a nessun case', message)
                        }
                    }
                })
            } catch (error) {
                console.error('error', error)
            }


        })
    }

    private broadcastSession(sessionId: string, message: any, sender: string) {
        const sessionUsers = this.sessions.get(sessionId)
        console.log('sessionUsers', sessionUsers)

        if (!sessionUsers) {
            console.log('session non trovata', sessionId)
            return
        }
        sessionUsers.forEach(user => {
            console.log('user', user, 'sender', sender)
            if (user !== sender) {
                const userSocket = this.connections.get(user)
                if (userSocket?.readyState === WebSocket.OPEN) {

                    const messageConstructor = { ...message, sender: sender }
                    //console.log('messageConstructor', messageConstructor)

                    userSocket.send(JSON.stringify(messageConstructor))
                }
            }
        })
    }

    private getSessionId(username: string) {
        console.log('sto per ottenere la session id per', username)
        for (const [key, value] of this.sessions.entries()) {
            if (value.has(username)) {
                console.log('session id trovata', key)
                return key
            }
            console.log('session id non trovata')
            return undefined
        }

    }

    public logoutUser(username: string) {
        console.log(`Logout dell'utente ${username}`);
        // Se esiste una connessione WebSocket aperta per questo utente, la chiudiamo
        const ws = this.connections.get(username);
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
        // Rimuoviamo la connessione dalla mappa
        this.connections.delete(username);

        // Cerchiamo in quale sessione è presente l'utente
        for (const [sessionId, participants] of this.sessions.entries()) {
            if (participants.has(username)) {
                console.log(`L'utente ${username} era nella sessione ${sessionId}. Chiudiamo la sessione.`);
                // Notifichiamo agli altri partecipanti che la sessione è terminata
                participants.forEach(user => {
                    if (user !== username) {
                        const userSocket = this.connections.get(user);
                        if (userSocket && userSocket.readyState === WebSocket.OPEN) {
                            const message = {
                                type: "session-ended",
                                sessionId: sessionId,
                                user: username,
                                message: `La sessione è terminata perché ${username} ha effettuato il logout.`
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

}
