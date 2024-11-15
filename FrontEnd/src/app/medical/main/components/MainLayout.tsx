'use client';
// import React, { useState } from 'react';
import styles from './Main.module.scss';

// import Logo from '@/assets/images/logo.svg';
// import CapSule from '@/assets/images/capsule.svg';
// import Cxr from '@/assets/images/cxr.svg';
// import SelectTabIcons from '@/components/Tabs/components/SelectTabIcons';
import Input from './Input';
// import { useAppSelector } from '@/redux/store/hooks/store';

export default function Main() {
  // const { patient } = useAppSelector((state) => state.main);
  // const [isActive, setIsActive] = useState(false);
  // const toggleIcons = () => {
  //   setIsActive((prev) => !prev);
  // };
  return (
    <div className={styles.container}>
      <div className={styles.title}>MEDICAL COPILOT</div>
      <div className="flex justify-center items-center text-[20px] text-2c2c2c mt-4">
        Dr. Bell will tell you anything about medical knowledge!
      </div>
      <div className="flex justify-center items-center text-[16px] text-2c2c2c">
        Please type in the questions you`re curious about.
      </div>
      <div className={`flex justify-center items-center mt-12`}>
        {/* <div
          className={`relative w-[60px] h-[60px] mr-4 cursor-pointer ${isActive ? styles.active : ''}`}
        >
          <div
            className={styles.main}
            onClick={toggleIcons}
          >
            <SelectTabIcons
              logoType={tablist[selectedIndex].type}
              className={'w-[60px] h-[60px]'}
            />
          </div>
          <Logo className={styles.icon1} />
          <Cxr className={styles.icon2} />
          <CapSule className={styles.icon3} />
        </div> */}
        <Input />
      </div>
    </div>
  );
}
