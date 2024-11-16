import Message from './Message';
import styles from './MessageList.module.scss';
import { useEffect, useRef } from 'react';
// import { fetchMessages } from '@/apis/message';
import {
  setDispatchMessageList,
  setIsFirst,
  setLoading,
  setLoadingTabPathName,
  tab,
} from '@/redux/features/tab/tabSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { HashLoader } from 'react-spinners';
import { fetchCallAI, fetcMedicalAI } from '@/apis/Patient';
import { setSelectedTabPathName } from '@/redux/features/request/requestSlice';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@/components/Alarm/SSEHandler';

type Props = {
  selectReport: (reportId: string) => void;
  nowTab: tab;
};

export default function MessageList({ selectReport, nowTab }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const messageList = nowTab.messageList;
  const loading = useAppSelector((state) => state.tab.loading);
  const loadingPathName = useAppSelector((state) => state.tab.loadingTabPathName);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const handleAgentChat = async () => {
    await fetchCallAI({
      PID: nowTab.patient.pid,
      image: nowTab.patient.image,
      shootingDate: nowTab.patient.visitDate,
      sex: nowTab.patient.sex,
      age: nowTab.patient.age,
      comment: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
      key: nowTab.patientRequest.key,
      agent: nowTab.patient.modality,
    });
  };

  const handleMedicalChat = async () => {
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
            agent: 'ID: ${nowTab.patient.pid} MG\n${nowTab.firstMessage}',
            comment: response.response,
            question: false,
            createDate: '',
            memberId: '',
          },
        ]),
      );
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (nowTab.isFirst) {
      console.log(nowTab.patient.modality);
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
        dispatch(setLoadingTabPathName(nowTab.pathname));
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
        dispatch(setSelectedTabPathName(nowTab.pathname));
        dispatch(setLoadingTabPathName(nowTab.pathname));
        dispatch(setDispatchMessageList(notification));
      } else {
        const token: Token = jwtDecode(accessToken);
        const notification = [
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: `ID: ${nowTab.patient.pid} MG\n${nowTab.firstMessage}`,
            question: true,
            createDate: '',
            memberId: token.id,
          },
        ];
        handleMedicalChat();
        dispatch(setDispatchMessageList(notification));
        dispatch(setLoadingTabPathName(nowTab.pathname));
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
      {loading && loadingPathName === nowTab.pathname && (
        <div className={`mt-20 flex justify-center`}>
          <HashLoader color="#5DA6F6" />
        </div>
      )}
    </div>
  );
}
