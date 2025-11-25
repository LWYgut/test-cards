export enum GameMode {
  SWEET = 'sweet', // 甜蜜 (Warm up)
  DEEP = 'deep',   // 深度 (Conversation)
  SPICY = 'spicy'  // 激情 (Fun/Intimacy)
}

export enum CardType {
  TRUTH = 'truth',
  DARE = 'dare',
  QUIZ = 'quiz'
}

export interface GameCardContent {
  type: CardType;
  text: string;
  emoji: string;
  instruction?: string;
}

export interface HistoryItem extends GameCardContent {
  id: string;
  timestamp: number;
}