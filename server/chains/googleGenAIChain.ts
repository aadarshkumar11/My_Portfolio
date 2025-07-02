import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export function makeChatChain() {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_GENAI_API_KEY environment variable is not set');
  }

  return new ChatGoogleGenerativeAI({
    apiKey: apiKey,
    model: 'gemini-2.0-flash',
    temperature: 0.7,
    maxOutputTokens: 1024,
    topP: 0.95,
    topK: 40,
  });
}
