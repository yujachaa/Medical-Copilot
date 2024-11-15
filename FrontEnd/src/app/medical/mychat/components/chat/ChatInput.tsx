'use client';

import styles from './ChatInput.module.scss';
import Send from '@/assets/images/send.svg';

export default function ChatInput() {
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.chatInput}
        placeholder="Enter a message"
      />
      <Send
        className={styles.sendIcon}
        onClick={() => {}}
      />
    </div>
  );
}
