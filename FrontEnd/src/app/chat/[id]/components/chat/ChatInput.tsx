import styles from './ChatInput.module.scss';
import { FaDatabase } from 'react-icons/fa6';
import Send from '@/assets/images/send.svg';

export default function ChatInput() {
  return (
    <div className={styles.inputContainer}>
      <FaDatabase className={styles.dbIcon} />

      <input
        className={styles.chatInput}
        placeholder="메시지를 입력하세요..."
      />
      <Send />
    </div>
  );
}
