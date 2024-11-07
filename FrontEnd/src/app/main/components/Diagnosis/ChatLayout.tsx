'use client';

import SideBar from '@/components/SideBar/SideBar';
import ChatInput from './components/chat/ChatInput';
import MessaageList from './components/chat/MessageList';
import PluginInfo from './components/report/PluginInfo';
import ReportBtn from './components/report/ReportBtn';
import ReportData from './components/report/ReportData';
import ReportInfo from './components/report/ReportInfo';
import Summary from './components/report/Summary';
import styles from './page.module.scss';
import Header from '@/components/Header/Header';
import { useEffect, useState } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { TbFoldDown, TbFoldUp } from 'react-icons/tb';
import { CgClose } from 'react-icons/cg';

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const minimizeChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

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
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <Header />
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
            <MessaageList />
            <ChatInput />
          </div>

          <div className={styles.reportContainer}>
            <div className={styles.scrollable}>
              <div className={styles.reportInfo}>
                <PluginInfo type="CXR" />
                <ReportInfo
                  id="R12345678"
                  date={new Date()}
                />
                <ReportBtn />
              </div>
              <ReportData />
              <Summary />
            </div>
          </div>

          <div
            className={`${styles.messageButton} ${isChatOpen ? styles.active : ''}`}
            onClick={toggleChat}
          >
            <BiMessageRoundedDots size={35} />
          </div>
        </div>
      </div>
    </div>
  );
}
