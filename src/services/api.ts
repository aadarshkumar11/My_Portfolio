export interface ChatRequest { message: string }
export interface ChatResponse { reply: string }

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Chat API error');
  return res.json();
}
