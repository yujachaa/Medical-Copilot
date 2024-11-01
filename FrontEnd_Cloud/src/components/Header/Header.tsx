'use client';
import { PiPowerFill } from 'react-icons/pi';

import styles from './Header.module.scss';
import Logo from '@/assets/images/logo.svg';

export default function Header() {
  return (
    <div className={`${styles.main} w-screen h-[70] flex justify-between items-center pl-6 pr-6`}>
      <Logo />
      <div className={`flex justify-center items-center gap-6`}>
        <div
          className={`${styles.clientRegist} w-[160] h-[40] rounded-[10] flex justify-center items-center`}
        >
          Client Regist
        </div>
        <PiPowerFill className={`${styles.logout}`} />
      </div>
    </div>
  );
}
