'use client';

import { useEffect, useState } from 'react';
import styles from './RemainBar.module.scss';

export default function RemainBar({ data }: { data: number }) {
  const [remainPercent, setRemainPercent] = useState<number>(0);
  useEffect(() => {
    setRemainPercent(data);
  }, [data]);
  return (
    <div className={`${styles.remainbar} relative z-10 h-[15px] rounded-[20px]`}>
      <div
        style={{ width: `${remainPercent}%` }}
        className={`${styles.bludremainbar} absolute left-0 h-[15px] rounded-[20px]`}
      ></div>
    </div>
  );
}
