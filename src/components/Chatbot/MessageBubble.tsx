import React from 'react';
import styles from './Chatbot.module.css';
import { FaRobot } from 'react-icons/fa';
import { marked } from 'marked';

export interface MessageBubbleProps {
  message: string;
  sender: 'user' | 'bot';
  typing?: boolean;
}

const BotAvatar = () => (
  <span className={styles.botAvatar}>
    <FaRobot size={18} color="#fff" />
  </span>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender, typing }) => (
  <div className={`${styles.bubble} ${sender === 'user' ? styles.user : styles.bot}`}
       style={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'pre-line', overflowX: 'auto' }}>
    {sender === 'bot' && <BotAvatar />}
    <span
      className={styles.messageContent}
      dangerouslySetInnerHTML={sender === 'bot' ? { __html: marked.parse(message) } : undefined}
    >
      {sender === 'user' ? message : null}
    </span>
    {typing && (
      <span className={styles.typingDots}>
        <span className={styles.typingDot}></span>
        <span className={styles.typingDot}></span>
        <span className={styles.typingDot}></span>
      </span>
    )}
  </div>
);

export default MessageBubble;
