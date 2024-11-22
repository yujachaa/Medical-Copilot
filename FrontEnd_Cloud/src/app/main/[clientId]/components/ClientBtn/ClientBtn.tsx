'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './ClientBtn.module.scss';

export default function ClientBtn({
  standard,
  setStandard,
}: {
  standard: number;
  setStandard: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className={`${styles.main} flex justify-end items-center pl-4 pr-4 h-[10%] min-h-[60px]`}>
      <div className={`${styles.standard} flex gap-3 text-xl`}>
        <span
          className={`${standard === 0 && styles.active}`}
          onClick={() => {
            setStandard(0);
          }}
        >
          Year
        </span>
        <span
          className={`${standard === 1 && styles.active}`}
          onClick={() => {
            setStandard(1);
          }}
        >
          Mon
        </span>
        <span
          className={`${standard === 2 && styles.active}`}
          onClick={() => {
            setStandard(2);
          }}
        >
          Week
        </span>
      </div>
      {/* <div
        className={`${styles.errorlog} flex justify-center items-center w-[200px] h-[40px] gap-3 rounded-[10px]`}
        // onClick={() => {
        //   setLogModal((prev) => !prev);
        // }}
      >
        <LuDoorOpen />
        <span>Error Log</span>
      </div> */}
    </div>
  );
}
