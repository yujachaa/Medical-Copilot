import Message from './Message';
import styles from './MessageList.module.scss';
import { MessageType } from '../../ChatLayout';

type Props = {
  messagelist: MessageType[];
};
export default function MessageList({ messagelist }: Props) {
  return (
    <div className={styles.msgList}>
      {messagelist.map((message, index) => (
        <Message
          key={index}
          sender={message.question ? 'user' : 'bot'}
          message={message.comment}
        />
      ))}
      {/* <Message
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
      /> */}
    </div>
  );
}
