'use client';
import React, { useState } from 'react';
import styles from './Main.module.scss';

import Logo from '@/assets/images/logo.svg';
import CapSule from '@/assets/images/capsule.svg';
import Cxr from '@/assets/images/cxr.svg';
import { PluginType } from '@/components/Tabs/Tab';
import SelectTabIcons from '@/components/Tabs/components/SelectTabIcons';
import Input from './Input';

export default function Main() {
  const [isActive, setIsActive] = useState(false);
  const [plugin, setPlugin] = useState<PluginType>('default');
  const toggleIcons = () => {
    setIsActive((prev) => !prev);
  };
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
        <div
          className={`relative w-[60px] h-[60px] mr-4 cursor-pointer ${isActive ? styles.active : ''}`}
        >
          <div
            className={styles.main}
            onClick={toggleIcons}
          >
            <SelectTabIcons
              logoType={plugin}
              className={'w-[60px] h-[60px]'}
            />
          </div>
          <Logo
            className={styles.icon1}
            onClick={() => {
              setPlugin('default');
              setIsActive(false);
            }}
          />
          <Cxr
            className={styles.icon2}
            onClick={() => {
              setPlugin('cxr');
              setIsActive(false);
            }}
          />
          <CapSule
            className={styles.icon3}
            onClick={() => {
              setPlugin('capsule');
              setIsActive(false);
            }}
          />
        </div>
        <Input />
      </div>
    </div>
  );
}
