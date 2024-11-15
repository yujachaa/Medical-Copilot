'use client';

import { PiPowerFill } from 'react-icons/pi';

import styles from './Header.module.scss';
import Logo from '@/assets/images/logo.svg';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setClientAddModal } from '@/redux/features/modal/modalSlice';
import { useRouter } from 'next/navigation';
import { fetchLogout } from '@/apis/fetchLogout';

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    console.log('문제 3');

    const data = await fetchLogout();
    if (data) {
      console.log('문제 4');

      router.replace('/');
    }
  };
  return (
    <div
      className={`${styles.main} w-screen h-[70px] flex justify-between items-center pl-6 pr-6 relative`}
    >
      <Logo
        className={`${styles.logo} cursor-pointer`}
        onClick={() => {
          router.push('/main');
        }}
      />
      <div className={`flex justify-center items-center gap-6`}>
        <div
          className={`${styles.clientRegist} cursor-pointer w-[160px] h-[40px] rounded-[10px] flex justify-center items-center`}
          onClick={() => {
            dispatch(setClientAddModal());
          }}
        >
          Client Regist
        </div>
        <PiPowerFill
          className={`${styles.logout} cursor-pointer`}
          onClick={() => {
            handleLogout();
          }}
        />
      </div>
    </div>
  );
}
