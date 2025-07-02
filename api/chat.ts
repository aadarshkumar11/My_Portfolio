import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

function makeChatChain() {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log environment variable availability (without exposing the actual key)
    console.log('GOOGLE_GENAI_API_KEY available:', !!process.env.GOOGLE_GENAI_API_KEY);
    
    const { messages, systemPrompt } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages missing or not an array' });
    }

    const chatChain = makeChatChain();
    const chatMessages = [
      ...(systemPrompt ? [new SystemMessage(systemPrompt)] : []),
      ...messages.map((m: { content: string }) => new HumanMessage(m.content)),
    ];

    const response = await chatChain.invoke(chatMessages);
    
    let text = '';
    if (typeof response.text === 'string') text = response.text;
    else if (typeof response.content === 'string') text = response.content;
    else if (Array.isArray(response.content) && response.content.length > 0) {
      if (typeof response.content[0] === 'string') text = response.content[0];
      // fallback: stringify unknown structure
      else text = JSON.stringify(response.content[0]);
    } else {
      text = JSON.stringify(response);
    }

    res.status(200).json({ text });
  } catch (err) {
    console.error('Chatbot error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
}
