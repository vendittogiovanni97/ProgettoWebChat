export type MessageType =
  | "new-user"
  | "join-call"
  | "leave-call"
  | "offer"
  | "answer"
  | "ice-candidate";

  export default interface WebsocketMessage {
    type: MessageType,
    username: string,
    receiver?: string,
    sender?: string
  }