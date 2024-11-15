import { fetchTotal } from '@/apis/fetchTotal';
import { useEffect, useState } from 'react';

type totalData = { id: string; label: string; value: number; color: string }[];

export function useTotalUsage() {
  const [list, setList] = useState<totalData>([]);

  function removeCapsule(dataList: totalData): totalData {
    return dataList.filter((item) => item.id !== 'capsule');
  }

  useEffect(() => {
    const handleTotalData = async () => {
      const data = await fetchTotal();
      if (data) {
        const newList: totalData = Object.entries(data).map(([key, value]) => ({
          id: key,
          label: key,
          value: value as number,
          color: 'hsl(60, 70%, 50%)',
        }));
        console.log('여기여기여기', newList);
        setList(removeCapsule(newList));
      }
    };
    handleTotalData();
  }, []);

  return { list };
}
