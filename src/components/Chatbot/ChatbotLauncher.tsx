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
    whileHover={{ scale: 1.13, boxShadow: '0 8px 32px #6366f1cc' }}
    whileTap={{ scale: 0.97 }}
    animate={{
      boxShadow: [
        '0 4px 32px 0 #6366f188',
        '0 8px 48px 0 #6366f1cc',
        '0 4px 32px 0 #6366f188'
      ],
      scale: [1, 1.08, 1],
    }}
    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
    aria-label="Open AI Chatbot"
    onClick={onClick}
  >
    <motion.span
      animate={{ scale: [1, 1.12, 1], rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <FaRobot size={32} />
    </motion.span>
  </motion.button>
);

export default ChatbotLauncher;
