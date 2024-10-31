import Message from './Message';
import styles from './MessageList.module.scss';

export default function MessaageList() {
  return (
    <div className={styles.msgList}>
      <Message
        sender="bot"
        message="Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
      <Message
        sender="user"
        message="Analyze the chest X-ray image and provide a detailed report on your findings."
      />
    </div>
  );
}
