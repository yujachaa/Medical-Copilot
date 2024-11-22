import Message from './Message';
import styles from './MessageList.module.scss';
import { MessageType } from '../../MyChat';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { fetchMessages } from '@/apis/message';
import { useAppSelector } from '@/redux/store/hooks/store';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@/components/Alarm/SSEHandler';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  selectReport: (reportId: string) => void;
};

export default function MessageList({ messagelist, setMessagelist, selectReport }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(0);
  const [size] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false); // 추가
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const decode: Token = jwtDecode(accessToken);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, []);

  useEffect(() => {
    const getPatient = async () => {
      if (isLoading) return; // 이미 로딩 중이면 요청 중단

      setIsLoading(true); // 로딩 시작
      try {
        const response = await fetchMessages(page, size, decode.id);
        if (response.content === undefined) {
          throw new Error('Response 데이터가 이상합니다');
        }
        setMessagelist((prev) => [...prev, ...response.content[0].chatList]);
      } catch (err: unknown) {
        console.log(err);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };
    getPatient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, setMessagelist]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading]); // 의존성에 isLoading 추가

  useEffect(() => {
    const option = {
      threshold: 0.1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

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
      <div
        className="w-4 h-4 border"
        ref={loader}
      ></div>
    </div>
  );
}
