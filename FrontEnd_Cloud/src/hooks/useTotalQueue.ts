import { fetchTotalQueue } from '@/apis/fetchTotalQueue';
import { Dispatch, SetStateAction, useEffect } from 'react';

type queueList = { id: string; color: string; data: { x: number; y: number }[] }[];

export function useTotalQueue(setList: Dispatch<SetStateAction<queueList>>) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTotalQueue();
      if (data) {
        setList((prevList) => {
          if (prevList.length === 0) return prevList; // 빈 배열일 경우 예외 처리

          const newData = prevList[0].data.slice(1); // 맨 앞의 원소 제거
          const idx = prevList[0].data[prevList[0].data.length - 1].x; // 마지막 원소의 x 값
          newData.push({ x: idx + 1, y: data['agent-usage-0'] }); // 새 데이터 추가

          return [{ id: 'queue', color: 'hsl(100, 70%, 50%)', data: newData }];
        });
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, [setList]);
}
