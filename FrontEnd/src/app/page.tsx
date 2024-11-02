'use client';

import Image from 'next/image';
import Logo from '@/assets/images/Logo_Landing.png';
import styles from './page.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const medicalRef = useRef(null);
  const copilotRef = useRef(null);
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    const element1 = medicalRef.current;
    const element2 = copilotRef.current;
    if (element1 && element2) {
      setTimeout(() => {
        setAnimation(true);
      }, 500);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  }, []);
  return (
    <>
      <div className={`w-screen h-screen flex justify-center items-center gap-5 overflow-hidden`}>
        <Image
          className={`${styles.logoInit} ${animation ? styles.logoActive : null}`}
          src={Logo}
          alt="Logo"
        />
        <div
          className={`flex flex-col text-6xl w-[365] h-[150] justify-center ${styles.text} gap-2`}
        >
          <span
            ref={medicalRef}
            className={`${styles.slideLeftIn} ${animation ? styles.active : null}`}
          >
            MEDIC<span className={`${styles.blue}`}>A</span>L
          </span>
          <span
            ref={copilotRef}
            className={`${styles.slideRightIn} ${animation ? styles.active : null} flex justify-end`}
          >
            COP<span className={`${styles.blue}`}>I</span>LOT
          </span>
        </div>
      </div>
    </>
  );
}
