'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import styles from './Header.module.scss';
import UserIcon from '@/assets/images/userImg.png';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { TbLogout, TbSettingsFilled } from 'react-icons/tb';
import TabBoard from '../Tabs/TabBoard/TabBoard';
import PatientHistory from '../PatientHistory/PatientHistory';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { fetchLogout } from '@/apis/fetchLogout';
import { setInit } from '@/redux/features/user/userSlice';

export default function Header() {
  const pathname = usePathname(); // 현재 URL 경로를 가져옴
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMainWithId = /^\/main\/\d+$/.test(pathname);
  const clickUser = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };
  const accessToken = useAppSelector<string>((state) => state.user.accessToken);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await fetchLogout(accessToken);
    dispatch(setInit());
    router.push('/');
  };

  const handleHistoryClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsHistoryOpen(false);
      setIsAnimating(false);
    }, 600); // 애니메이션 시간과 동일하게 설정
  };
  console.log(pathname);
  return (
    <div className={styles.header}>
      {isHistoryOpen && (
        <PatientHistory
          isAnimate={isAnimating}
          onClose={handleHistoryClose}
        />
      )}
      <TabBoard />
      {isMainWithId ? (
        <div className={styles.mainHeader}>
          <div className="flex gap-[10px] items-center hover:bg-gray-100 p-2 rounded-md">
            <Image
              src={UserIcon}
              alt="유저아이콘"
              width={30}
              height={30}
              className="cursor-pointer"
              onClick={clickUser}
            />
            <span
              className="cursor-pointer"
              onClick={clickUser}
            >
              UserName
            </span>
          </div>
          <div
            className={`${styles.history} ml-auto`}
            onClick={() => setIsHistoryOpen(true)}
          >
            Patient History
          </div>
        </div>
      ) : null}
      {isUserModalOpen && (
        <div
          className={`absolute top-[102px] left-4 w-40 bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20 ${styles.modal}`}
        >
          <ul className="flex flex-col gap-2 font-bold">
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <FaStar className="w-[20px] h-[20px]" />
              <span>My Plan</span>
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbSettingsFilled className="w-[20px] h-[20px]" />
              <span>Settings</span>
            </li>
            <li
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2"
              onClick={() => {
                handleLogout();
              }}
            >
              <TbLogout className="w-[20px] h-[20px] ml-[2px]" />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
