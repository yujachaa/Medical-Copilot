'use client';

import styles from './LoginInput.module.scss';
import { useState } from 'react';
import { fetchLogin } from '@/apis/fetchLogin';
import { useRouter } from 'next/navigation';

export default function LoginInput() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    const data = await fetchLogin(email, password);
    if (data) {
      router.replace('/main');
    } else {
      alert('로그인 실패');
    }
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleLogin();
            }
          }}
        />
      </div>
      <div className={`${styles.btn} flex w-full`}>
        <div
          className={`${styles.signup} w-[422px] h-[64px] flex justify-center items-center cursor-pointer`}
          onClick={handleLogin}
        >
          Login
        </div>
      </div>
    </div>
  );
}
