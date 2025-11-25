import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameMode, GameCardContent, CardType } from "../types";
import { OFFLINE_CONTENT } from "../constants";

// Ensure API Key exists
const apiKey = process.env.API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({ apiKey: apiKey });
  } catch (e) {
    console.warn("Failed to initialize GoogleGenAI", e);
  }
}

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    type: {
      type: Type.STRING,
      enum: ["truth", "dare", "quiz"],
      description: "The type of the card: truth (真心话), dare (大冒险), or quiz (默契测试).",
    },
    text: {
      type: Type.STRING,
      description: "The main content text of the card in Chinese. engaging and fun.",
    },
    emoji: {
      type: Type.STRING,
      description: "A single emoji representing the content.",
    },
    instruction: {
      type: Type.STRING,
      description: "A short instruction for the players (e.g., '看着对方眼睛回答', '限时30秒').",
    },
  },
  required: ["type", "text", "emoji"],
};

// Helper to get random offline content
const getOfflineCard = (mode: GameMode): GameCardContent => {
  const pool = OFFLINE_CONTENT[mode];
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

export const generateCard = async (mode: GameMode): Promise<GameCardContent> => {
  // If no API key or AI init failed, use offline content immediately
  if (!apiKey || !ai) {
    // Simulate a small network delay for realism
    await new Promise(resolve => setTimeout(resolve, 600)); 
    return getOfflineCard(mode);
  }

  try {
    const promptMap = {
      [GameMode.SWEET]: "生成一个适合情侣的'甜蜜'互动卡片。可以是关于美好回忆的真心话，或者温馨的小互动（大冒险）。内容要可爱、轻松。",
      [GameMode.DEEP]: "生成一个适合情侣的'深度'交流卡片。关于未来、价值观、或者感情深处的问题。目的是增进理解。",
      [GameMode.SPICY]: "生成一个适合情侣的'心跳'互动卡片。可以是稍微亲密一点的肢体接触挑战，或者撩人的情话。内容要充满情趣但不低俗。",
    };

    const prompt = `${promptMap[mode]} 请用中文回复。确保内容不仅有趣，而且能增进感情。`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a romantic relationship expert creating a card game for couples. Your tone is fun, encouraging, and supportive.",
        temperature: 1.0, 
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text) as GameCardContent;
      return data;
    }

    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error (Using Fallback):", error);
    // Fallback content in case of error
    return getOfflineCard(mode);
  }
};