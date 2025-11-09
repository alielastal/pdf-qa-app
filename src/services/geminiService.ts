import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

// Fix: Per coding guidelines, the API key is accessed via import.meta.env and is assumed to be set.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

const model = 'gemini-2.5-flash';

export async function startChatWithDocument(documentText: string): Promise<{ chat: Chat, initialHistory: ChatMessage[] }> {
  const chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: "You are an expert Q&A assistant. You will be given a document's text. Your task is to answer questions based ONLY on the information present in that document. If the answer is not found in the document, you must state that the information is not available in the provided text. Do not use any external knowledge. Start by acknowledging you have analyzed the document and are ready for questions.",
    },
  });

  const response = await chat.sendMessage({ message: `Here is the document: \n\n${documentText}` });

  const initialHistory: ChatMessage[] = [
    {
      role: 'model',
      text: response.text,
    },
  ];

  return { chat, initialHistory };
}
