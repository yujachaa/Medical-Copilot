import { fetchClientModule } from '@/apis/fetchClientModule';
import { getSpecificDay } from '@/utils/getDay';
import { getMonthFromIndex } from '@/utils/getMonth';
import { getWeekRange } from '@/utils/getWeek';
import { useEffect, useState } from 'react';

type data = {
  cxr: number[];
  mg: number[];
  // capsule: number[];
};

type result = {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}[];

export function useClientModule(standard: number, serialKey: string) {
  const [list, setList] = useState<result>([]);
  function removeCapsule(dataList: result): result {
    return dataList.filter((item) => item.id !== 'capsule');
  }

  useEffect(() => {
    const handleTotalData = async () => {
      const data: data = await fetchClientModule(standard, serialKey);
      if (data) {
        const newList: result = Object.entries(data).map(([key, value]) => ({
          id: key,
          color: 'hsl(166, 70%, 50%)',
          data: value.map((data1, index) => ({
            x:
              standard === 0
                ? getMonthFromIndex(index + 1)
                : standard === 2
                  ? getSpecificDay(index + 1)
                  : getWeekRange(index + 1),
            y: data1,
          })),
        }));
        setList(removeCapsule(newList));
      }
    };
    handleTotalData();
  }, [standard, serialKey]);

  return { list };
}
