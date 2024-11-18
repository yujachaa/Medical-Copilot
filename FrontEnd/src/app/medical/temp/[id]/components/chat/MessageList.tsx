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
import Image from 'next/image';

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
	const reportData = useAppSelector((state) => state.report.reportData);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messageList]);

  const handleAgentChat = async () => {
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
    const token: Token = jwtDecode(accessToken);
    const response = await fetcMedicalAI({
      comment: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
      isQuestion: true,
      PID: nowTab.patient.pid !== '' ? nowTab.patient.pid : token.id,
      member_id: token.id,
      agent: nowTab.patient.modality,
      chat_list: messageList.map((message) => {
        return {
          message: message.comment,
          isQuestion: message.question,
        };
      }),
      summary: reportData ? reportData.summary : "",
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
      if (nowTab.patient.modality === 'MG') {
        const notification = [
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: `ID: ${nowTab.patient.pid}\n${nowTab.firstMessage}`,
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
            comment: `ID: ${nowTab.patient.pid}\n${nowTab.firstMessage}`,
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
            comment: `${nowTab.firstMessage}`,
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
    <div className={styles.msgList}>
      {messageList.map((message, index) => {
        return (
          <>
            <Message
              key={index}
              sender={message.question ? 'user' : 'bot'}
              message={message.comment}
              data={message}
              selectReport={selectReport}
            />
            {message.agent === 'CXR' && message.question && index === messageList.length-2 && (
              <div className={`rounded-[10px] flex flex-col items-end gap-2`}>
                <Image
                  className={`rounded-[10px]`}
                  alt="cxr"
                  src={`${nowTab.patient.image}`}
                  width={250}
                  height={250}
                />
                <div className={`w-[250px] flex flex-col gap-2`}>
                  <div className={`w-[250px] flex gap-2`}>
                    <span className={`${styles.key}`}>ID:</span>
                    <span>{nowTab.patient.pid}</span>
                  </div>
                  <div className={`w-[250px] flex gap-2`}>
                    <span className={`${styles.key}`}>Gender:</span>
                    <span>{nowTab.patient.sex}</span>
                  </div>
                  <div className={`w-[250px] flex gap-2`}>
                    <span className={`${styles.key}`}>Age:</span>
                    <span>{nowTab.patient.age}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
      {loading && loadingPathName === nowTab.pathname && (
        <div className={`mt-10 mb-10 flex justify-center`}>
          <HashLoader color="#5DA6F6" />
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
}
