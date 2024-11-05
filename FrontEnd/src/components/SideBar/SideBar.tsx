'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SideBar.module.scss';
import Logo from '../../assets/images/logo.svg';
import { IoSearch } from 'react-icons/io5';
import { CgMenuGridR } from 'react-icons/cg';
import { FaBell, FaStar } from 'react-icons/fa';
import { TbLogout, TbSettingsFilled } from 'react-icons/tb';
import Image from 'next/image';
import UserIcon from '@/assets/images/userImg.png';
import { FaUserLarge } from 'react-icons/fa6';

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const clickUser = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goMain = () => {
    router.push('/main');
  };

  const handleTab = () => {
    router.push('/alarm');
  };

  return (
    <div className={`w-[55px] h-screen flex flex-col justify-between pt-2 pb-2 ${styles.main}`}>
      <div className={`w-[55px] h-[67px] flex justify-center items-center`}>
        <Logo
          className={`w-[35px] cursor-pointer`}
          onClick={goMain}
        />
      </div>
      <div className={`w-[55px] h-[890px] flex flex-col justify-center items-center gap-8`}>
        <IoSearch className={`${styles.menuBtn}`} />
        <CgMenuGridR className={`${styles.menuBtn}`} />
        <FaBell
          className={`${styles.menuBtn} p-0.5`}
          onClick={handleTab}
        />
        <FaUserLarge className={`${styles.menuBtn} p-1`} />
        <TbSettingsFilled className={`${styles.menuBtn}`} />
      </div>
      <div className={`w-[55px] h-[67px] flex justify-center items-center relative`}>
        <Image
          src={UserIcon}
          alt="유저아이콘"
          width={30}
          height={30}
          onClick={clickUser}
          className="cursor-pointer"
        />
      </div>

      {isModalOpen && (
        <div
          className={`absolute bottom-[10px] left-[60px] w-40 bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20 ${styles.modal}`}
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
            <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2">
              <TbLogout className="w-[20px] h-[20px] ml-[2px]" />
              <span>Log out</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
