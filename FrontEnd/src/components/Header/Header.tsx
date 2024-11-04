'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import styles from './Header.module.scss';
import UserIcon from '@/assets/images/userImg.png';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { TbLogout, TbSettingsFilled } from 'react-icons/tb';
import TabBoard from '../Tabs/TabBoard/TabBoard';

export default function Header() {
  const pathname = usePathname(); // 현재 URL 경로를 가져옴
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const isMainWithId = /^\/main\/\d+$/.test(pathname);
  const clickUser = () => {
    setIsUserModalOpen(!isUserModalOpen);
  };

  console.log(pathname);
  return (
    <div className={styles.header}>
      <TabBoard />
      {isMainWithId ? (
        <div className={styles.mainHeader}>
          <div className="flex gap-[10] items-center hover:bg-gray-100 p-2 rounded-md">
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
        </div>
      ) : null}
      {isUserModalOpen && (
        <div
          className={`absolute top-[102] left-4 w-40 bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20 ${styles.modal}`}
        >
          <ul className="flex flex-col gap-2 font-bold">
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <FaStar className="w-[20] h-[20]" />
              <span>My Plan</span>
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbSettingsFilled className="w-[20] h-[20]" />
              <span>Settings</span>
            </li>
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbLogout className="w-[20] h-[20] ml-[2]" />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
