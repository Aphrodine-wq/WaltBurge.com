import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY || '';

// System instruction to give the AI context about Walt
const SYSTEM_INSTRUCTION = `
You are the AI portfolio assistant for Walt Burge.
Walt is a highly skilled Software Full Systems Engineer with expertise in AI.
Key facts about Walt:
- He has created his own custom Coding Language called "G-Rump" and a corresponding "G-Rump IDE".
- He specializes in low-level systems engineering (C++, Assembly, Kernel Dev).
- He is proficient in Artificial Intelligence, including LLM Integration, RAG Pipelines, AI Agents, and Python automation.
- He builds custom Windows Tools like "ClipSync" and "IconGEN".
- He develops for Mobile and Games (iOS/Metal, Unreal Engine).
- He builds high-end web platforms (React, Next.js, Cloud Infra).

Your goal is to answer visitor questions about Walt's skills, experience, and projects professionally.
Adopt a helpful, slightly technical persona ("System Assistant").
Keep answers concise (under 100 words).
If asked about contact info, direct them to the contact section.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
    return "Error: AI Service unavailable (Missing API Key).";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm processing that, but received no text output.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a system error while processing your request.";
  }
};