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
import PatientHistory from '../PatientHistory/PatientHistory';
import { setInit } from '@/redux/features/user/userSlice';
import { fetchLogout } from '@/apis/fetchLogout';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import AlarmModal from '../Alarm/AlarmModal';

export default function SideBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const accessToken = useAppSelector<string>((state) => state.user.accessToken);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const clickUser = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goMain = () => {
    router.push('/main');
  };

  const handleHistoryClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsHistoryOpen(false);
      setIsAnimating(false);
    }, 700); // 애니메이션 시간과 동일하게 설정
  };

  const handleHistory = () => {
    if (!isHistoryOpen) setIsHistoryOpen(true);
    else handleHistoryClose();
  };

  const handleLogout = async () => {
    await fetchLogout(accessToken);
    dispatch(setInit());
    router.push('/');
  };

  return (
    <>
      {isHistoryOpen && (
        <PatientHistory
          isAnimate={isAnimating}
          onClose={handleHistoryClose}
        />
      )}
      {isNotification && <AlarmModal onClose={() => setNotification(false)} />}
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
            onClick={() => setNotification((prev) => !prev)}
          />
          <FaUserLarge
            className={`${styles.menuBtn} p-1`}
            onClick={handleHistory}
          />
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
    </>
  );
}
