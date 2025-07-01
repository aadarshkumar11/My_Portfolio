// Export a function that initializes Google’s Gen AI client
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import dotenv from 'dotenv';
dotenv.config();

export function makeChatChain() {
  return new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    model: 'models/gemini-2.0-flash',
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  });
}
