export interface ChatRequest { message: string }
export interface ChatResponse { reply: string }

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  try {
    // The backend expects { messages: [{ content: string }] }
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ content: req.message }] }),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP ${res.status}: ${res.statusText}`);
    }
    
    const data = await res.json();
    // The backend returns { text }
    return { reply: data.text || 'No response received' };
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
}
