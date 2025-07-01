export interface ChatRequest { message: string }
export interface ChatResponse { reply: string }

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  // The backend expects { messages: [{ content: string }] }
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ content: req.message }] }),
  });
  if (!res.ok) throw new Error('Chat API error');
  const data = await res.json();
  // The backend returns { text }
  return { reply: data.text };
}
