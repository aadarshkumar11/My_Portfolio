import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaTrash, FaRobot } from 'react-icons/fa';
import styles from './Chatbot.module.css';
import MessageBubble from './MessageBubble';

export interface ChatMessage {
  message: string;
  sender: 'user' | 'bot';
  typing?: boolean;
}

interface ChatWindowProps {
  open: boolean;
  messages: ChatMessage[];
  input: string;
  onInput: (v: string) => void;
  onSend: () => void;
  onClose: () => void;
  loading: boolean;
  showWelcome?: boolean;
  subtitle?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  open,
  messages,
  input,
  onInput,
  onSend,
  onClose,
  loading,
  showWelcome = true,
  subtitle = "Aadarsh's AI Assistant"
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Enhancement: Clear chat handler
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Clear all chat history?')) {
      onInput('');
      // This should be handled by parent, so emit a custom event for clearing messages
      const event = new CustomEvent('clearChat');
      window.dispatchEvent(event);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.chatPanel}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <div className={styles.headerMinimal}>
            <span className={styles.headerIcon}><FaRobot size={20} /></span>
            <span className={styles.headerTitle}>{subtitle}</span>
            <div className={styles.headerActions}>
              <button className={styles.clearBtn} onClick={handleClear} title="Clear chat" aria-label="Clear chat">
                <FaTrash />
              </button>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close chatbot">
                <FaTimes />
              </button>
            </div>
          </div>
          <div className={styles.messages}>
            {showWelcome && (
              <div className={styles.welcome}>
                👋 Hi! I’m <b>Aadarsh's AI Assistant</b>. Ask me anything or try: <br />
                <em>“Show me your latest projects”</em>
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={i + '-' + msg.sender + '-' + msg.message.slice(0,8)} message={msg.message} sender={msg.sender} typing={msg.typing} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          {loading && (
            <div className={styles.typingBar}>
              <span className={styles.typingDots}>
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
                <span className={styles.typingDot}></span>
              </span>
              <span style={{marginLeft: '0.7em'}}>Aadarsh's AI Assistant is typing…</span>
            </div>
          )}
          <form
            className={styles.inputBar}
            onSubmit={e => {
              e.preventDefault();
              if (!loading && input.trim()) onSend();
            }}
            style={{ position: 'sticky', bottom: 0, background: 'rgba(40,41,61,0.82)', zIndex: 2 }}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Ask Aadarsh's AI Assistant anything..."
              value={input}
              onChange={e => onInput(e.target.value)}
              disabled={loading}
              autoFocus={open}
              maxLength={512}
            />
            <motion.button
              className={styles.sendBtn}
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              whileHover={{ scale: 1.13, boxShadow: '0 0 0 3px #a5b4fc88' }}
              whileTap={{ scale: 0.97 }}
            >
              {loading ? <FaPaperPlane style={{ opacity: 0.5 }} /> : <FaPaperPlane />}
            </motion.button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
