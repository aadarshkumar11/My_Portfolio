import React, { useState, useEffect } from 'react';
import ChatbotLauncher from './ChatbotLauncher';
import ChatWindow, { type ChatMessage } from './ChatWindow';
import { sendChat } from '../../services/api';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Listen for clearChat event from ChatWindow
  useEffect(() => {
    const clearHandler = () => setMessages([]);
    window.addEventListener('clearChat', clearHandler);
    return () => window.removeEventListener('clearChat', clearHandler);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { message: input, sender: 'user' };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await sendChat({ message: userMsg.message });
      setMessages(msgs => [...msgs, { message: res.reply, sender: 'bot' }]);
    } catch {
      setMessages(msgs => [...msgs, { message: 'Sorry, something went wrong.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ChatbotLauncher onClick={() => setOpen(true)} />
      <ChatWindow
        open={open}
        messages={messages}
        input={input}
        onInput={setInput}
        onSend={handleSend}
        onClose={() => setOpen(false)}
        loading={loading}
        showWelcome={messages.length === 0}
        subtitle="Aadarsh's AI Assistant"
      />
    </>
  );
};

export default ChatbotWidget;
