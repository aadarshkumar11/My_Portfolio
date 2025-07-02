import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ChatbotLauncher from './ChatbotLauncher';
import ChatWindow, { type ChatMessage } from './ChatWindow';
import { sendChat } from '../../services/api';

const ChatbotWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // Create portal root and attach to document.body
  useEffect(() => {
    const root = document.createElement('div');
    root.id = 'chatbot-portal';
    root.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
      pointer-events: none !important;
    `;
    
    document.body.appendChild(root);
    setPortalRoot(root);

    return () => {
      if (document.body.contains(root)) {
        document.body.removeChild(root);
      }
    };
  }, []);

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

  const chatbotContent = (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 999999,
      pointerEvents: 'auto'
    }}>
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
    </div>
  );

  return portalRoot ? createPortal(chatbotContent, portalRoot) : null;
};

export default ChatbotWidget;
