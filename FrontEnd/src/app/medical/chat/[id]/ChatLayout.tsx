'use client';

import ChatInput from './components/chat/ChatInput';
import MessaageList from './components/chat/MessageList';
// import PluginInfo from './components/report/PluginInfo';
import ReportBtn from './components/report/ReportBtn';
import ReportData from './components/report/ReportData';
import ReportInfo from './components/report/ReportInfo';
import Summary from './components/report/Summary';
import styles from './page.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { BiMessageRoundedDots } from '@react-icons/all-files/bi/BiMessageRoundedDots';
import { TbFoldDown, TbFoldUp } from 'react-icons/tb';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { fetchDrawing, fetchReport } from '@/apis/report';
import { clearReportData, setReportData } from '@/redux/features/report/reportSlice';
import { clearCoordinates, setCoordinates } from '@/redux/features/report/coordinateSlice';
import { useSearchParams } from 'next/navigation';
import ReportLodaing from '@/components/ReportLodaing';

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
  //어떤리포트를 처음에 띄워줄건가? 이걸 내가 한번 필터를 해야하나?
  const [selectedReportId, setReportId] = useState<string>('');
  const { reportData } = useAppSelector((state) => state.report);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const tabIndex = useAppSelector((state) => state.tab.selectedIndex);
  const tabList = useAppSelector((state) => state.tab.tablist);
  const nowTab = useMemo(() => {
    return tabList[tabIndex];
  }, [tabList, tabIndex]);
  //지역변수 messagelist
  const [messagelist, setMessagelist] = useState<MessageType[]>([]);

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
    if (searchParams.get('reportId')) {
      setReportId(searchParams.get('reportId')!);
    }
  }, [searchParams]);

  useEffect(() => {
    const getReport = async () => {
      const response = await fetchReport(selectedReportId);
      if (response) dispatch(setReportData(response)); //리포트 데이터 저장
    };
    if (selectedReportId !== '')
      getReport(); // reportId가 있는 경우 report 데이터 가져오기
    else dispatch(clearReportData()); //없는 경우 reportData 비우기
  }, [selectedReportId, dispatch]);

  useEffect(() => {
    const getDrawing = async () => {
      const response = await fetchDrawing(selectedReportId);
      if (response) dispatch(setCoordinates(response.coordinatesGroups));
      // setDrawingCoodinates(response.coordinatesGroups);
    };
    if (selectedReportId !== '') getDrawing();
    else dispatch(clearCoordinates());
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
          nowTab={nowTab}
          selectReport={selectReport}
          pid={pid}
          messagelist={messagelist}
          setMessagelist={setMessagelist}
        />
        <ChatInput
          nowTab={nowTab}
          messagelist={messagelist}
          setMessagelist={setMessagelist}
          pid={pid}
        />
      </div>

      {selectedReportId !== '' ? (
        <div className={styles.reportContainer}>
          <div className={styles.scrollable}>
            <div className={styles.reportInfo}>
              {/* <PluginInfo type={patient.modality} /> */}
              <ReportInfo
                id={selectedReportId}
                date={reportData ? new Date(reportData.createDate) : undefined}
              />
              <ReportBtn messagelist={nowTab.messageList} />
            </div>
            <ReportData />
            <Summary />
          </div>
        </div>
      ) : (
        <div className={styles.reportContainer}>
          <div className={styles.scrollable}>
            <div className={styles.reportInfo}>{/* <PluginInfo type={patient.modality} /> */}</div>
            <ReportLodaing />
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
