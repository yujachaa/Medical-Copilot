'use client';

import styles from './Main.module.scss';
import Input from './Input';
import { useAppSelector } from '@/redux/store/hooks/store';
import { useEffect } from 'react';

export default function Main() {
  const tabList = useAppSelector((state) => state.tab.tablist);
  const tabIdx = useAppSelector((state) => state.tab.selectedIndex);
  useEffect(() => {}, [tabIdx, tabList]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>MEDICAL COPILOT</div>
      <div className="flex justify-center items-center text-[20px] text-2c2c2c mt-4">
        Medical Copilot is here to provide answers on any medical topic!
      </div>
      <div className="flex justify-center items-center text-[16px] text-2c2c2c">
        Just type in your questions.
      </div>
      <div className={`flex justify-center items-center mt-12`}>
        <Input />
      </div>
    </div>
  );
}
