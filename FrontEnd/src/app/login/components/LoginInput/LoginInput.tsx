'use client';

import { useState } from 'react';
import styles from './LoginInput.module.scss';
import { fetchLogin } from '@/apis/fetchLogin';
import { useRouter } from 'next/navigation';

export default function LoginInput() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    const data = await fetchLogin(email, password);
    console.log(data);
  };

  return (
    <div className={`${styles.main} flex flex-col items-center gap-10`}>
      <div className={`flex flex-col gap-[7px]`}>
        <input
          className={`${styles.Email} w-[422px] h-[70px]`}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className={`${styles.PW} w-[422px] h-[70px]`}
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <span className={`flex justify-end text-[red] font-[700]`}>Check your email password</span>
      </div>
      <div className={`${styles.btn} flex justify-between w-full`}>
        <button
          className={`${styles.signup} w-[190px] h-[64px] flex justify-center items-center`}
          onClick={() => {
            router.push('/regist');
          }}
        >
          Sign up
        </button>
        <button
          className={`${styles.login} w-[190px] h-[64px] flex justify-center items-center`}
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button>
      </div>
      <span className={`text-xl underline cursor-pointer`}>Having Trouble?</span>
    </div>
  );
}
