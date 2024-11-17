'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './LoginInput.module.scss';
import { fetchLogin } from '@/apis/fetchLogin';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setUserInfo } from '@/redux/features/user/userSlice';
// import { getOTP } from '@/redux/features/alarm/alarmSlice';

export default function LoginInput() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (message === 'login_required') {
      alert('Login is required.');
    }
  }, [message]);

  const handleLogin = async () => {
    const data = await fetchLogin(email, password);
    if (data) {
      setIsLogin(true);
      dispatch(setUserInfo(data.status));
      // dispatch(getOTP());
      router.replace('/medical');
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
          ref={emailRef}
          className={`${styles.Email} w-[422px] h-[70px]`}
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
            setIsLogin(true);
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
            setIsLogin(true);
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
            router.replace('/regist');
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
    </div>
  );
}
