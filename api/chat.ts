import type { VercelRequest, VercelResponse } from '@vercel/node';
import { makeChatChain } from '../server/chains/googleGenAIChain';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
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
    res.status(500).json({ error: (err instanceof Error ? err.message : 'Internal server error') });
  }
}
