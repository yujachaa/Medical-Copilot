import { useState } from 'react';
import styles from './PWInput.module.scss';
import { updatePW } from '@/apis/user';

export default function PWInput({ isPWInput }: { isPWInput: boolean }) {
  const [currentPW, setCurrentPW] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCurrentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPW(event.target.value);
  };
  const handleNewInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCancle = () => {
    setCurrentPW('');
    setPassword('');
  };

  const changePW = async () => {
    const data = await updatePW(currentPW, password);
    if (data) {
      alert('비밀번호가 수정되었습니다.');
    } else {
      alert('현재 비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
      <div
        className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isPWInput ? '40px' : '0px'}] items-start`}
      >
        <span></span>
        <input
          placeholder="Current Password"
          className={`w-[80%] h-[30px]`}
          type="password"
          onChange={handleCurrentInputChange}
        />
      </div>
      <div
        className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isPWInput ? '40px' : '0px'}] items-start`}
      >
        <span></span>
        <input
          placeholder="New Password"
          className={`w-[80%] h-[30px]`}
          type="password"
          onChange={handleNewInputChange}
        />
        <span
          className={`${styles.setting1} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
          onClick={changePW}
        >
          변경
        </span>
        <span
          className={`${styles.setting2} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
          onClick={handleCancle}
        >
          취소
        </span>
      </div>
    </>
  );
}
