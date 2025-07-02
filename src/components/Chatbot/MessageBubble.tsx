import React from 'react';
import { motion } from 'framer-motion';
import styles from './Chatbot.module.css';
import { FaRobot, FaUser } from 'react-icons/fa';
import { marked } from 'marked';

export interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'bot';
  typing?: boolean;
}

const BotAvatar = () => (
  <motion.div 
    className={styles.botAvatar}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    <FaRobot />
  </motion.div>
);

const UserAvatar = () => (
  <motion.div 
    className={styles.userAvatar}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
  >
    <FaUser />
  </motion.div>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, typing }) => (
  <motion.div 
    className={`${styles.bubble} ${sender === 'user' ? styles.user : styles.bot}`}
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      type: "spring", 
      stiffness: 500, 
      damping: 30,
      duration: 0.3
    }}
    
    layout
  >
    {sender === 'bot' ? <BotAvatar /> : <UserAvatar />}
    
    <motion.div
      className={styles.messageContent}
      initial={{ opacity: 0, x: sender === 'user' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      {sender === 'bot' ? (
        <div 
          dangerouslySetInnerHTML={{ __html: marked.parse(message) }}
        />
      ) : (
        <span>{message}</span>
      )}
      
      {typing && (
        <motion.div 
          className={styles.typingDots}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.typingDot}></span>
          <span className={styles.typingDot}></span>
          <span className={styles.typingDot}></span>
        </motion.div>
      )}
    </motion.div>
  </motion.div>
);

export default MessageBubble;
