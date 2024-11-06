'use client';

import { KeyboardEvent, useState } from 'react';
import styles from './LoginInput.module.scss';
import { fetchLogin } from '@/apis/fetchLogin';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setUserInfo } from '@/redux/features/user/userSlice';

export default function LoginInput() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleLogin = async () => {
    const data = await fetchLogin(email, password);
    if (data) {
      setIsLogin(true);
      dispatch(setUserInfo(data.status));
      router.push('/main');
    } else {
      setIsLogin(false);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const button = document.getElementById('Login');
      if (button) {
        button.click();
      }
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
          onKeyUp={(event: KeyboardEvent) => {
            handleKeyUp(event);
          }}
        />
        <input
          className={`${styles.PW} w-[422px] h-[70px]`}
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          onKeyUp={(event: KeyboardEvent) => {
            handleKeyUp(event);
          }}
        />
        {!isLogin ? (
          <span className={`flex justify-end text-[red] font-[700px]`}>
            Check your email or password
          </span>
        ) : null}
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
          id="Login"
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
