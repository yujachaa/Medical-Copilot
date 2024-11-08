import { fetchClientModule } from '@/apis/fetchClientModule';
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

export function useClientModule(standard: number, serialKey: string) {
  const [list, setList] = useState<result>([]);

  useEffect(() => {
    const handleTotalData = async () => {
      const data: data = await fetchClientModule(standard, serialKey);
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
  }, [standard, serialKey]);

  return { list };
}
