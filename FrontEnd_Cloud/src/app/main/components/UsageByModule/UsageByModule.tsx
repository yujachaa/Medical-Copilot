'use client';

import { useState } from 'react';
import styles from './UsageByModule.module.scss';
import UsageByModuleGraph from './UsageByModuleGraph';
import { useUsageByModule } from '@/hooks/useUsageByModule';

export default function UsageByModule() {
  const [standard, setStandard] = useState<number>(2);
  const { list } = useUsageByModule(standard);
  return (
    <div className={`${styles.main} w-full box-border p-3 flex flex-col`}>
      <div className={`flex justify-between h-[40px] items-center`}>
        <span className={`${styles.title} text-2xl`}>Usage graph by module</span>
        <div className={`${styles.standard} flex gap-3 text-xl`}>
          <span
            className={`cursor-pointer ${standard === 0 ? styles.active : null}`}
            onClick={() => {
              setStandard(0);
            }}
          >
            Year
          </span>
          <span
            className={`${styles.mon} cursor-pointer ${standard === 1 ? styles.active : null}`}
            onClick={() => {
              setStandard(1);
            }}
          >
            Mon
          </span>
          <span
            className={`${styles.week} cursor-pointer ${standard === 2 ? styles.active : null}`}
            onClick={() => {
              setStandard(2);
            }}
          >
            Week
          </span>
        </div>
      </div>
      <div className={`w-full h-full min-h-[200px]`}>
        <UsageByModuleGraph list={list} />
      </div>
    </div>
  );
}
