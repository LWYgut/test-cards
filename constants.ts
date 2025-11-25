import { GameMode } from "./types";

export const APP_NAME = "🩷包子🩵";

export const MODE_CONFIG = {
  [GameMode.SWEET]: {
    label: "甜蜜日常",
    color: "bg-pink-400",
    gradient: "from-pink-400 to-rose-400",
    emoji: "🍬",
    description: "轻松温馨的互动，适合热身"
  },
  [GameMode.DEEP]: {
    label: "灵魂拷问",
    color: "bg-indigo-500",
    gradient: "from-indigo-400 to-purple-500",
    emoji: "🌌",
    description: "深入了解彼此的内心世界"
  },
  [GameMode.SPICY]: {
    label: "心跳加速",
    color: "bg-red-500",
    gradient: "from-red-500 to-rose-600",
    emoji: "🔥",
    description: "增加亲密度的趣味挑战"
  }
};