'use client';

import { PiPowerFill } from 'react-icons/pi';

import styles from './Header.module.scss';
import Logo from '@/assets/images/logo.svg';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setClientAddModal } from '@/redux/features/modal/modalSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div
      className={`${styles.main} w-screen h-[70] flex justify-between items-center pl-6 pr-6 relative`}
    >
      <Logo
        onClick={() => {
          router.push('/main');
        }}
      />
      <div className={`flex justify-center items-center gap-6`}>
        <div
          className={`${styles.clientRegist} w-[160] h-[40] rounded-[10] flex justify-center items-center`}
          onClick={() => {
            dispatch(setClientAddModal());
          }}
        >
          Client Regist
        </div>
        <PiPowerFill className={`${styles.logout}`} />
      </div>
    </div>
  );
}
