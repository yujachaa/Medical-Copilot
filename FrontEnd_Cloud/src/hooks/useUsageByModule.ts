import { fetchUsageByModule } from '@/apis/fetchUsageByModule';
import { useEffect, useState } from 'react';

type data = {
  csr: number[];
  mg: number[];
  capsule: number[];
};

type result = {
  id: string;
  color: string;
  data: { x: number; y: number }[];
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
            x: index + 1,
            y: data1,
          })),
        }));
        setList(newList);
      }
    };
    handleTotalData();
  }, [standard]);

  return { list };
}
