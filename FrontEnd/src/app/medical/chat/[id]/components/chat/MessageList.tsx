import Message from './Message';
import styles from './MessageList.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages } from '@/apis/message';
import { setDispatchMessageList, setIsFirst, tab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
// import { MessageType } from '../../ChatLayout';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';

type Props = {
  // messagelist: MessageType[];
  // setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  selectReport: (reportId: string) => void;
  pid: string;
  nowTab: tab;
};
export default function MessageList({ selectReport, pid, nowTab }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);
  const messagelist = nowTab.messageList;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tab.loading);
  const loadingPathName = useAppSelector((state) => state.tab.loadingTabPathName);
  const isFirst = nowTab.isFirst;

  const getMessages = async (page: number, size: number, pid: string) => {
    try {
      const response = await fetchMessages(page, size, pid);
      if (response.content === undefined) {
        new Error('Response 데이터가 이상합니다');
        return;
      }

      //setPrevMessageList로 바꾸기!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      dispatch(setDispatchMessageList(response.content[0].chatList));
      // setMessagelist((prev) => [...prev, ...response.content[0].chatList]);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log('메세지리스트 바뀜요', messagelist);
  // }, [messagelist]);

  useEffect(() => {
    //처음으로 렌더링 할 때
    if (isFirst) {
      getMessages(page, size, pid);
      dispatch(setIsFirst());
    }
  },[]);

  // useEffect(() => {
  //   getMessages();
  //   console.log('메세지 리스트', messagelist);
  // }, [page, size, pid]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
      getMessages(page, size, pid); //페이지네이션
    }
  }, []);

  useEffect(() => {
    const option = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div
      ref={scrollRef}
      className={styles.msgList}
    >
      {loading && loadingPathName === nowTab.pathname && (
        <>
          <div className={`mt-10 mb-10 flex justify-center`}>
            <HashLoader color="#5DA6F6" />
          </div>
        </>
      )}

      {messagelist.map((message, index) => (
        <>
          {loading &&
            loadingPathName === nowTab.pathname &&
            index === 1 &&
            nowTab.patient.modality === 'CXR' && (
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
          <Message
            key={index}
            sender={message.question ? 'user' : 'bot'}
            message={message.comment}
            data={message}
            selectReport={selectReport}
          />
        </>
      ))}
      <div
        className="w-4 h-10 border"
        ref={loader}
      ></div>
    </div>
  );
}
