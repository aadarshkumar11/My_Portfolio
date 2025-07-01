import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import * as dotenv from 'dotenv';
dotenv.config();

export function makeChatChain() {
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    model: 'gemini-2.0-flash',
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  });
}
