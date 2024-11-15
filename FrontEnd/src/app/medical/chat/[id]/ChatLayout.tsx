'use client';

import ChatInput from './components/chat/ChatInput';
import MessaageList from './components/chat/MessageList';
import PluginInfo from './components/report/PluginInfo';
import ReportBtn from './components/report/ReportBtn';
import ReportData from './components/report/ReportData';
import ReportInfo from './components/report/ReportInfo';
import Summary from './components/report/Summary';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { BiMessageRoundedDots } from '@react-icons/all-files/bi/BiMessageRoundedDots';
import { TbFoldDown, TbFoldUp } from 'react-icons/tb';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { fetchDrawing, fetchReport } from '@/apis/report';
import { setReportData } from '@/redux/features/report/reportSlice';
import { setCoordinates } from '@/redux/features/report/coordinateSlice';

type ChatProps = {
  pid: string;
};

export type MessageType = {
  id: string;
  agent: string;
  comment: string;
  createDate: string;
  memberId: string;
  question: boolean;
  reportId: string;
};

export default function Chat({ pid }: ChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  //어떤리포트를 처음에 띄워줄건가? 이걸 내가 한번 필터를 해야하나?
  const [selectedReportId, setReportId] = useState<string>('');
  const { patient } = useAppSelector((state) => state.main);
  const { reportData } = useAppSelector((state) => state.report);
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

  // useEffect(() => {
  //   const fetchPatient = async () => {
  //     const response = await fetchPatientChat(pid);
  //     console.log('페이션트:', response);
  //     setMessages(response.chatList);
  //     //가장 마지막 리포트를 저장
  //     setReportId(response.chatList[response.chatList.length - 1].reportId);
  //   };
  //   fetchPatient();
  // }, [pid]);

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
          pid={pid}
        />
        <ChatInput />
      </div>

      {/* 이부분이 랜더링이 되야한다 
             1. 채팅의 버튼을 클릭하는데, reportId가 있는 채팅만 클릭이 가능하게한다.
             2. 그러면 여기서 선택된 리포트를 관리하는것 그리고 그것을 리포트정보에 넣어주는것
          */}

      {selectedReportId !== '' ? (
        <div className={styles.reportContainer}>
          <div className={styles.scrollable}>
            <div className={styles.reportInfo}>
              <PluginInfo type={patient.modality} />
              <ReportInfo
                id={selectedReportId}
                date={reportData ? new Date(reportData.createDate) : undefined}
              />
              <ReportBtn messagelist={messages} />
            </div>
            <ReportData />
            <Summary />
          </div>
        </div>
      ) : (
        <div className={styles.reportContainer}>
          <div className={styles.scrollable}>
            <div className={styles.reportInfo}>
              <PluginInfo type={patient.modality} />
            </div>
          </div>
        </div>
      )}

      <div
        className={`${styles.messageButton} ${isChatOpen ? styles.active : ''}`}
        onClick={toggleChat}
      >
        <BiMessageRoundedDots size={35} />
      </div>
    </div>
  );
}
