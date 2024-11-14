import styles from './Message.module.scss';
import Image from 'next/image';
import chatbotImg from '@/assets/images/chatbotImg.png';
import userImg from '@/assets/images/userImg.png';
import { MessageType } from '../../Chat';

interface MessageProps {
  sender: 'bot' | 'user'; // 발신자 종류를 나타내는 prop
  message: string; // 메시지 내용을 나타내는 prop
  selectReport: (reportId: string) => void;
  data: MessageType;
}

export default function Message({ sender, message, selectReport, data }: MessageProps) {
  const from = sender === 'bot' ? 'Medical Copilot' : 'You';

  const handleClick = (reportId: string) => {
    selectReport(reportId);
  };
  return (
    <div className={`${styles.msgContainer} ${sender === 'user' ? styles.userContainer : ''}`}>
      <div className={styles.msgName}>
        <Image
          src={sender === 'bot' ? chatbotImg : userImg}
          alt="발신자아이콘"
          width={40}
          height={40}
        />

        <div>{from}</div>
      </div>
      <div
        className={`${styles.msg} ${sender === 'bot' ? styles.botStyle : styles.userStyle}`}
        onClick={sender === 'bot' ? () => handleClick(data.reportId) : undefined}
      >
        {message}
      </div>
    </div>
  );
}
