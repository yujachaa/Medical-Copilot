'use client';

import styles from './ClientBtn.module.scss';
import { LuDoorOpen } from 'react-icons/lu';

export default function ClientBtn() {
  return (
    <div
      className={`${styles.main} flex justify-between items-center pl-4 pr-4 h-[10%] min-h-[60px]`}
    >
      <div className={`${styles.standard} flex gap-3 text-xl`}>
        <span style={{ backgroundColor: '#6EA7E9', color: 'white' }}>Year</span>
        <span>Mon</span>
        <span>Week</span>
      </div>
      <div
        className={`${styles.errorlog} flex justify-center items-center w-[200px] h-[40px] gap-3 rounded-[10px]`}
        // onClick={() => {
        //   setLogModal((prev) => !prev);
        // }}
      >
        <LuDoorOpen />
        <span>Error Log</span>
      </div>
    </div>
  );
}
