import Message from './Message';
import styles from './MessageList.module.scss';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages } from '@/apis/message';
import { tab } from '@/redux/features/tab/tabSlice';
import { useAppSelector } from '@/redux/store/hooks/store';
import { HashLoader } from 'react-spinners';
import Image from 'next/image';
import { MessageType } from '../../ChatLayout';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  selectReport: (reportId: string) => void;
  pid: string;
  nowTab: tab;
};
export default function MessageList({
  selectReport,
  pid,
  nowTab,
  messagelist,
  setMessagelist,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);
  // const messagelist = nowTab.messageList;
  // const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.tab.loading);
  const loadingPathName = useAppSelector((state) => state.tab.loadingTabPathName);
  // const isFirst = nowTab.isFirst;
  const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);

  const getMessages = async (page: number, size: number, pid: string) => {
    if (isMessageLoading) return;

    setIsMessageLoading(true);
    try {
      const response = await fetchMessages(page, size, pid);
      if (response.content === undefined) {
        new Error('Response 데이터가 이상합니다');
        return;
      }
      // dispatch(setDispatchMessageList(response.content[0].chatList));
      setMessagelist((prev) => [...prev, ...response.content[0].chatList]);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsMessageLoading(false);
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

  useEffect(() => {
    console.log('메세지리스트 바뀜요', messagelist);
  }, [messagelist]);

  useEffect(() => {
    console.log(page);
    getMessages(page, size, pid);
    console.log('메세지 리스트', messagelist);
  }, [page, size, pid]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const observerTarget = loader.current; // loader.current 값을 로컬 변수에 저장
    const option = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerTarget) observer.observe(observerTarget);

    // 클린업 함수에서 로컬 변수를 사용
    return () => {
      if (observerTarget) observer.unobserve(observerTarget);
    };
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
        <React.Fragment key={index}>
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
        </React.Fragment>
      ))}
      <div
        className="w-4 h-10 border"
        ref={loader}
      ></div>
    </div>
  );
}
