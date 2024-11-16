'use client';

import ChatInput from './components/chat/ChatInput';
import MessaageList from './components/chat/MessageList';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { BiMessageRoundedDots } from '@react-icons/all-files/bi/BiMessageRoundedDots';
import { TbFoldDown, TbFoldUp } from 'react-icons/tb';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { fetchDrawing, fetchReport } from '@/apis/report';
import { setReportData } from '@/redux/features/report/reportSlice';
import { setCoordinates } from '@/redux/features/report/coordinateSlice';

export type MessageType = {
  id: string;
  agent: string;
  comment: string;
  createDate: string;
  memberId: string;
  question: boolean;
  reportId: string;
};

export default function MyChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const [selectedReportId, setReportId] = useState<string>('');
  const dispatch = useAppDispatch();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const minimizeChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const selectReport = (reportId: string) => {
    setReportId(reportId);
  };

  useEffect(() => {
    const getReport = async () => {
      const response = await fetchReport(selectedReportId);
      console.log('리포트:', response);
      if (response) dispatch(setReportData(response)); //리포트 데이터 저장
    };
    if (selectedReportId !== '') getReport();
  }, [selectedReportId, dispatch]);

  useEffect(() => {
    const getDrawing = async () => {
      const response = await fetchDrawing(selectedReportId);
      console.log('그림 좌표', response);
      if (response) dispatch(setCoordinates(response.coordinatesGroups));
      // setDrawingCoodinates(response.coordinatesGroups);
    };
    if (selectedReportId !== '') getDrawing();
  }, [selectedReportId, dispatch]);

  // 화면 크기 변화에 따른 채팅창 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsChatOpen(true); // 768px 이상에서는 항상 보이도록 설정
      }
    };

    handleResize(); // 초기 화면 크기에 따라 설정
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시 실행
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.content}>
      <div
        className={`${styles.chatContainer} ${
          isChatOpen ? styles.open : styles.hidden
        } ${isChatMinimized ? styles.minimized : ''}`}
      >
        <div className={styles.chatHeader}>
          <button onClick={minimizeChat}>
            {isChatMinimized ? <TbFoldUp size={25} /> : <TbFoldDown size={25} />}
          </button>
          <button onClick={toggleChat}>
            <CgClose size={25} />
          </button>
        </div>
        <MessaageList
          messagelist={messages}
          setMessagelist={setMessages}
          selectReport={selectReport}
        />
        <ChatInput
          messagelist={messages}
          setMessagelist={setMessages}
        />
      </div>

      <div
        className={`${styles.messageButton} ${isChatOpen ? styles.active : ''}`}
        onClick={toggleChat}
      >
        <BiMessageRoundedDots size={35} />
      </div>
      <div className={styles.right}>여기에 어떤게 들어오면 좋을까요</div>
    </div>
  );
}
