import { fetchClientUsage } from '@/apis/fetchClientUsage';
import { useEffect, useState } from 'react';

type totalData = { id: string; label: string; value: number; color: string }[];

export function useClientUsage(standard: number, serialKey: string) {
  const [list, setList] = useState<totalData>([]);

  useEffect(() => {
    const handleClientUsage = async () => {
      const data = await fetchClientUsage(standard, serialKey);
      if (data) {
        const newList: totalData = Object.entries(data).map(([key, value]) => ({
          id: key,
          label: key,
          value: value as number,
          color: 'hsl(60, 70%, 50%)',
        }));
        setList(newList);
      }
    };
    handleClientUsage();
  }, [standard, serialKey]);

  return { list };
}
