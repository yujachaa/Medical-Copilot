import { fetchUsageByModule } from '@/apis/fetchUsageByModule';
import { getSpecificDay } from '@/utils/getDay';
import { getMonthFromIndex } from '@/utils/getMonth';
import { getWeekRange } from '@/utils/getWeek';
import { useEffect, useState } from 'react';

type data = {
  csr: number[];
  mg: number[];
  // capsule: number[];
};

type result = {
  id: string;
  color: string;
  data: { x: string; y: number }[];
}[];

export function useUsageByModule(standard: number) {
  const [list, setList] = useState<result>([]);

  useEffect(() => {
    const handleTotalData = async () => {
      const data: data = await fetchUsageByModule(standard);
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

        console.log(newList);
        setList(newList.slice(0, -1));
      }
    };
    handleTotalData();
  }, [standard]);

  return { list };
}
