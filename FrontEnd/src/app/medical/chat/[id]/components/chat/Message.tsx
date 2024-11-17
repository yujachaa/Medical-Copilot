import styles from './Message.module.scss';
import Image from 'next/image';
import chatbotImg from '@/assets/images/chatbotImg.png';
import userImg from '@/assets/images/userImg.png';
import { MessageType } from '../../ChatLayout';
import { useParams, useRouter } from 'next/navigation';

interface MessageProps {
  sender: 'bot' | 'user'; // 발신자 종류를 나타내는 prop
  message: string; // 메시지 내용을 나타내는 prop
  selectReport: (reportId: string) => void;
  data: MessageType;
}

export default function Message({ sender, message, selectReport, data }: MessageProps) {
  const from = sender === 'bot' ? 'Medical Copilot' : 'You';
  const params = useParams();
  const router = useRouter();

  const handleClick = (reportId: string) => {
    console.log('메세지 파람스', params);
    selectReport(reportId);
    router.replace(`/medical/chat/${params.id}?reportId=${data.reportId}`);
    // console.log('메세지 데이타', data);
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
        className={`${styles.msg} ${sender === 'bot' ? styles.botStyle : styles.userStyle} ${sender === 'bot' && data.reportId && styles.report}`}
        onClick={sender === 'bot' && data.reportId ? () => handleClick(data.reportId) : undefined}
      >
        {message}
      </div>
    </div>
  );
}
