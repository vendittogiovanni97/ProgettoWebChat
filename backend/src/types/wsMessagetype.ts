export type CallMessageType =
  | "offer"
  | "answer"
  | "ice-candidate"
  | "join-call"
  | "leave-call"
  | "call-status"
  | "invite-to-call"
  | "mute"
  | "screen-share";

export type SystemMessageType =
  | "user-status"
  | "new-user"
  | "kick-user"
  | "warning"
  | "room-join"
  | "room-leave";

export type ChatMessageType =
  | "send-message"
  | "receive-message"
  | "typing"
  | "delete-message"
  | "edit-message"
  | "broadcast-message"
  | "message-read";

export type FileMediaMessageType =
  | "file-transfer"
  | "image-message"
  | "video-message"
  | "audio-message";

export type MessageType =
  | FileMediaMessageType
  | ChatMessageType
  | CallMessageType
  | SystemMessageType;

export default interface WebsocketMessage {
  type: MessageType;
  username: string;
  receiver?: string;
  sender?: string;
}
