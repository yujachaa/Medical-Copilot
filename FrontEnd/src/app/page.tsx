import Image from 'next/image';
import Logo from '@/assets/images/Logo_Landing.png';
import styles from './page.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link
        href="/login"
        className={`w-screen h-screen flex justify-center items-center gap-5`}
      >
        <Image
          src={Logo}
          alt="Logo"
        />
        <div
          className={`flex flex-col text-6xl w-[365] h-[150] justify-center ${styles.text} gap-2`}
        >
          <span>
            MEDIC<span className={`${styles.blue}`}>A</span>L
          </span>
          <span className={`flex justify-end`}>
            COP<span className={`${styles.blue}`}>I</span>LOT
          </span>
        </div>
      </Link>
    </>
  );
}
