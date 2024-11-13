'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SideBar.module.scss';
import Logo from '../../assets/images/logo.svg';
import { IoSearch } from '@react-icons/all-files/io5/IoSearch';
import { CgMenuGridR } from '@react-icons/all-files/cg/CgMenuGridR';
import { FaBell } from '@react-icons/all-files/fa/FaBell';
import { FaStar } from '@react-icons/all-files/fa/FaStar';
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
  const router = useRouter();
  const accessToken = useAppSelector<string>((state) => state.user.accessToken);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await fetchLogout(accessToken);
    dispatch(setInit());
    router.push('/');
  };

  const clickUser = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goMain = () => {
    router.push('/main');
  };

  const goSettings = () => {
    router.push('/mypage?t=profile');
  };

  const goPlan = () => {
    router.push('/mypage?t=plan');
  };

  const handleHistoryClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsHistoryOpen(false);
      setIsAnimating(false);
    }, 700);
  };

  const handleHistory = () => {
    if (!isHistoryOpen) setIsHistoryOpen(true);
    else handleHistoryClose();
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
        <div
          className={`w-[55px] h-[67px] flex justify-center items-center max-768:w-[67px] max-768:h-[55px]`}
        >
          <Logo
            className={`w-[35px] cursor-pointer`}
            onClick={goMain}
          />
        </div>
        <div
          className={`w-[55px] h-[890px] flex flex-col justify-center items-center gap-8 max-768:w-[890px] max-768:h-[55px] max-768:flex-row`}
        >
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
        <div
          className={`w-[55px] h-[67px] flex justify-center items-center relative max-768:w-[67px] max-768:h-[55px]`}
        >
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
            className={`absolute bottom-[10px] left-[60px] w-40 bg-white shadow-md rounded-md p-2 text-blue-btn border-solid border border-black/20 max-768:bottom-[60px] max-768:left-[unset] max-768:right-[10px] ${styles.modal}`}
          >
            <ul className="flex flex-col gap-2 font-bold">
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2"
                onClick={goPlan}
              >
                <FaStar className="w-[20px] h-[20px]" />
                <span>My Plan</span>
              </li>
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2"
                onClick={goSettings}
              >
                <TbSettingsFilled className="w-[20px] h-[20px]" />
                <span>Settings</span>
              </li>
              <li
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md flex items-center gap-2"
                onClick={handleLogout}
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
