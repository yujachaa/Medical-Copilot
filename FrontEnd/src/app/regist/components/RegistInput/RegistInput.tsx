'use client';

import { useRouter } from 'next/navigation';
import styles from './RegistInput.module.scss';
import { useCheckEmail } from '@/hooks/useCheckEmail';
import { useCheckName } from '@/hooks/useCheckName';
import { useCheckPassword } from '@/hooks/useCheckPassword';
import { useCheckCfPassword } from '@/hooks/useCheckCfPassword';
import { fetchRegist } from '@/apis/fetchRegist';

export default function RegistInput() {
  const router = useRouter();
  const { email, setEmail, isCorrectEmail } = useCheckEmail();
  const { name, setName, isCorrectName } = useCheckName();
  const { password, setPassword, isCorrectPassword } = useCheckPassword();
  const { cfPassword, setCfPassword, isCorrectCfPassword } = useCheckCfPassword(password);

  const handleRegist = async () => {
    if (isCorrectEmail && isCorrectName && isCorrectPassword && isCorrectCfPassword) {
      const data = await fetchRegist(email, password, name);
      if (data.msg === 'success') {
        router.push('/login');
      }
    }
  };

  return (
    <>
      <div className={`${styles.main} flex flex-col items-center gap-1`}>
        <div className={`flex flex-col h-[78px]`}>
          <input
            className={`w-[400px] h-[60px] rounded-[10px] ${styles.input}`}
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          {email !== '' && !isCorrectEmail ? (
            <span className={`flex justify-end ${styles.text}`}>
              Please check the email format.
            </span>
          ) : null}
        </div>
        <div className={`flex flex-col h-[78px]`}>
          <input
            className={`w-[400px] h-[60px] rounded-[10px] ${styles.input}`}
            placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {name !== '' && !isCorrectName ? (
            <span className={`flex justify-end ${styles.text}`}>
              Please write in English 1~20 characters
            </span>
          ) : null}
        </div>
        <div className={`flex flex-col h-[78px]`}>
          <input
            className={`w-[400px] h-[60px] rounded-[10px] ${styles.input}`}
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {password !== '' && !isCorrectPassword ? (
            <span className={`flex justify-end ${styles.text}`}>Check the password format.</span>
          ) : null}
        </div>
        <div className={`flex flex-col h-[78px]`}>
          <input
            className={`w-[400px] h-[60px] rounded-[10px] ${styles.input}`}
            placeholder="Confirm Password"
            type="password"
            onChange={(event) => {
              setCfPassword(event.target.value);
            }}
          />
          {cfPassword !== '' && !isCorrectCfPassword ? (
            <span className={`flex justify-end ${styles.text}`}>The password is different.</span>
          ) : null}
        </div>
      </div>
      <span className={`w-[400px] h-[40px] text-xs`}>
        Please use 8 to 15 characters of English case letters, numbers, and special characters for
        the password.
      </span>
      <div className={`flex justify-between w-[400px]`}>
        <button
          className={`w-[170px] h-[64px] flex justify-center items-center rounded-[5px] ${styles.cancel}`}
          onClick={() => {
            router.push('/login');
          }}
        >
          Cancel
        </button>
        <button
          className={`w-[170px] h-[64px] flex justify-center items-center rounded-[5px] ${styles.confirm}`}
          onClick={() => {
            handleRegist();
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
}
