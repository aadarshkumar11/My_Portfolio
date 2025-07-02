import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';
import styles from './Chatbot.module.css';

interface ChatbotLauncherProps {
  onClick: () => void;
}

const ChatbotLauncher: React.FC<ChatbotLauncherProps> = ({ onClick }) => (
  <motion.button
    className={styles.launcher}
    onClick={onClick}
    whileHover={{ 
      scale: 1.08,
      y: -4
    }}
    whileTap={{ scale: 0.95 }}
    animate={{
      y: [0, -3, 0],
    }}
    transition={{ 
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
    aria-label="Open AI Chatbot Assistant"
    title="Chat with Aadarsh's AI Assistant"
  >
    <motion.div
      animate={{ 
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: 0.5
      }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <FaRobot />
   
      {/* Notification dot */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: '2px solid #ffffff',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
        
    {/* Pulse rings */}
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '2px solid rgba(99, 102, 241, 0.3)',
        pointerEvents: 'none',
      }}
      animate={{
        scale: [1, 1.5, 2],
        opacity: [0.5, 0.2, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />
    
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '2px solid rgba(99, 102, 241, 0.2)',
        pointerEvents: 'none',
      }}
      animate={{
        scale: [1, 1.8, 2.5],
        opacity: [0.3, 0.1, 0]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.5
      }}
    />
  </motion.button>
);

export default ChatbotLauncher;
