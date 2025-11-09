
export enum AppState {
  IDLE,
  PROCESSING_PDF,
  READY_TO_CHAT,
  CHATTING,
  ERROR,
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
