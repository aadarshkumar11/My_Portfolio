import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaTrash, FaRobot, FaSpinner } from 'react-icons/fa';
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Clear all chat history?')) {
      onInput('');
      const event = new CustomEvent('clearChat');
      window.dispatchEvent(event);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading && input.trim()) {
        onSend();
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className={styles.chatPanel}
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            duration: 0.4
          }}
        >
          {/* Enhanced Header */}
          <motion.div 
            className={styles.headerMinimal}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className={styles.headerIcon}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaRobot />
            </motion.div>
            <span className={styles.headerTitle}>{subtitle}</span>
            <div className={styles.headerActions}>
              <motion.button 
                className={styles.clearBtn} 
                onClick={handleClear} 
                title="Clear chat" 
                aria-label="Clear chat"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTrash />
              </motion.button>
              <motion.button 
                className={styles.closeBtn} 
                onClick={onClose} 
                aria-label="Close chatbot"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </div>
          </motion.div>

          {/* Messages Area */}
          <motion.div 
            className={styles.messages}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {showWelcome && messages.length === 0 && (
              <motion.div 
                className={styles.welcome}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: 'inline-block', marginRight: '0.5rem' }}
                >
                  👋
                </motion.div>
                Hi! I'm <b>Aadarsh's AI Assistant</b>. I know everything about his work, projects, and expertise!
                <br /><br />
                <strong>Ask me about:</strong>
                <div style={{ margin: '8px 0', fontSize: '0.9em', lineHeight: '1.4' }}>
                  🤖 <em>"Tell me about Aadarsh's AI/ML projects"</em><br />
                  💻 <em>"What technologies does he specialize in?"</em><br />
                  🚀 <em>"Show me his best achievements"</em><br />
                  📊 <em>"What's his experience with LLMs?"</em><br />
                  🎯 <em>"How can I work with Aadarsh?"</em>
                </div>
              </motion.div>
            )}
            
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <MessageBubble 
                  key={`${i}-${msg.sender}-${msg.message.slice(0, 10)}`} 
                  message={msg.message} 
                  sender={msg.sender} 
                  typing={msg.typing}
                />
              ))}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </motion.div>

          {/* Typing Indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                className={styles.typingBar}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.typingDots}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
                <span>Aadarsh's AI Assistant is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Input Bar */}
          <motion.form
            className={styles.inputBar}
            onSubmit={e => {
              e.preventDefault();
              if (!loading && input.trim()) onSend();
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Ask me anything about Aadarsh..."
              value={input}
              onChange={e => onInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              autoFocus={open}
              maxLength={500}
            />
            <motion.button
              className={styles.sendBtn}
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              whileHover={{ scale: loading || !input.trim() ? 1 : 1.05 }}
              whileTap={{ scale: loading || !input.trim() ? 1 : 0.95 }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner />
                </motion.div>
              ) : (
                <FaPaperPlane />
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
