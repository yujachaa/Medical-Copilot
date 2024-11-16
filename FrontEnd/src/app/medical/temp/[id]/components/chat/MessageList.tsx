import Message from './Message';
import styles from './MessageList.module.scss';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
// import { fetchMessages } from '@/apis/message';
import { setDispatchMessageList, setIsFirst, tab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { HashLoader } from 'react-spinners';
import { fetchCallAI, fetcMedicalAI } from '@/apis/Patient';

type Props = {
  loading: number;
  setLoading: Dispatch<SetStateAction<number>>;
  selectReport: (reportId: string) => void;
  nowTab: tab;
};
export default function MessageList({ loading, setLoading, selectReport, nowTab }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const messageList = nowTab.messageList;

  const handleAgentChat = async () => {
    setLoading(1);
    const response = await fetchCallAI({
      PID: nowTab.patient.pid,
      image: nowTab.patient.image,
      shootingDate: nowTab.patient.visitDate,
      sex: nowTab.patient.sex,
      age: nowTab.patient.age,
      comment: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
      key: nowTab.patientRequest.key,
      agent: nowTab.patient.modality,
    });
    console.log(response);
  };

  const handleMedicalChat = async () => {
    setLoading(1);
    const response = await fetcMedicalAI({
      comment: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
      isQuestion: true,
      PID: nowTab.patient.pid,
      member_id: '',
      agent: nowTab.patient.modality,
      chat_list: messageList.map((message) => {
        return {
          message: message.comment,
          isQuestion: message.question,
        };
      }),
      summary: '',
    });
    if (response) {
      dispatch(
        setDispatchMessageList([
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: response.response,
            question: false,
            createDate: '',
            memberId: '',
          },
        ]),
      );
      setLoading(2);
    }
  };

  useEffect(() => {
    if (nowTab.isFirst) {
      if (nowTab.patient.modality === 'MG') {
        const notification = [
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: `ID: ${nowTab.patient.pid} MG\n${nowTab.firstMessage}`,
            question: true,
            createDate: '',
            memberId: '',
          },
        ];
        handleMedicalChat();
        dispatch(setDispatchMessageList(notification));
      } else if (nowTab.patient.modality === 'CXR') {
        const notification = [
          {
            id: '',
            reportId: '',
            agent: 'CXR',
            comment: `ID: ${nowTab.patient.pid} CXR\n${nowTab.firstMessage}`,
            question: true,
            createDate: '',
            memberId: '',
          },
          {
            id: '',
            reportId: '',
            agent: 'CXR',
            comment: `Analyzing the data for ID ${nowTab.patient.pid}.`,
            question: false,
            createDate: '',
            memberId: '',
          },
        ];
        handleAgentChat();
        dispatch(setDispatchMessageList(notification));
      } else {
        const notification = [
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: `ID: ${nowTab.patient.pid} MG\n${nowTab.firstMessage}`,
            question: true,
            createDate: '',
            memberId: '',
          },
        ];
        handleMedicalChat();
        dispatch(setDispatchMessageList(notification));
      }
      dispatch(setIsFirst());
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className={styles.msgList}
    >
      {messageList.map((message, index) => (
        <Message
          key={index}
          sender={message.question ? 'user' : 'bot'}
          message={message.comment}
          data={message}
          selectReport={selectReport}
        />
      ))}
      {loading === 1 && (
        <div className={`mt-20 flex justify-center`}>
          <HashLoader color="#5DA6F6" />
        </div>
      )}
    </div>
  );
}
