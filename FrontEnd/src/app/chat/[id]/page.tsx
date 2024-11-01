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

export default function Chat() {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        <div className="w-full">
          <Header />
        </div>

        <div className={styles.content}>
          <div
            className={`shadow-md border-solid border-r border-black/20 ${styles.chatContainer}`}
          >
            <MessaageList />
            <ChatInput />
          </div>

          <div className={styles.reportContainer}>
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
      </div>
    </div>
  );
}
