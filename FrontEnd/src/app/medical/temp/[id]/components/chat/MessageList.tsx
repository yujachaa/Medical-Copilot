import Message from './Message';
import styles from './MessageList.module.scss';
import { MessageType } from '../../TempLayout';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
// import { fetchMessages } from '@/apis/message';
import { useAppSelector } from '@/redux/store/hooks/store';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  selectReport: (reportId: string) => void;
  pid: string;
};
export default function MessageList({ messagelist, setMessagelist, selectReport }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabIndex = useAppSelector((state) => state.tab.selectedIndex);
  const tabList = useAppSelector((state) => state.tab.tablist);

  useEffect(() => {
    if (tabList[tabIndex].patient.modality === 'MG') {
    } else if (tabList[tabIndex].patient.modality === 'CXR') {
      // const notification = [
      // 	{

      // 	},
      // 	{

      // 	}
      // ]
      setMessagelist((prev) => [...prev]);
    } else {
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className={styles.msgList}
    >
      {messagelist.map((message, index) => (
        <Message
          key={index}
          sender={message.question ? 'user' : 'bot'}
          message={message.comment}
          data={message}
          selectReport={selectReport}
        />
      ))}
    </div>
  );
}
