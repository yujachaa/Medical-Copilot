import { useState } from 'react';
import styles from './PWInput.module.scss';
import { updatePW } from '@/apis/user';
import { useCheckPassword } from '@/hooks/useCheckPassword';

export default function PWInput({ isPWInput }: { isPWInput: boolean }) {
  const [currentPW, setCurrentPW] = useState<string>('');
  const { password, setPassword, isCorrectPassword } = useCheckPassword();

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
    if (currentPW === password) {
      alert('새 비밀번호가 현재 비밀번호와 동일합니다.');
      return;
    }

    if (currentPW && isCorrectPassword) {
      const data = await updatePW(currentPW, password);
      if (data) {
        alert('비밀번호가 수정되었습니다.');
        handleCancle(); // 성공 시 입력 초기화
      } else {
        alert('현재 비밀번호를 확인해주세요.');
        handleCancle(); // 실패 시 입력 초기화
      }
    } else {
      alert('입력값을 다시 확인해주세요.');
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
          value={currentPW}
        />
      </div>
      <div
        className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isPWInput ? 'fit-content' : '0px'}] items-start`}
      >
        <span></span>
        <input
          placeholder="New Password"
          className={`w-[80%] h-[30px]`}
          type="password"
          onChange={handleNewInputChange}
          value={password}
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
        <span></span>
        {/* 비밀번호 경고메세지 표시 부분 */}
        {password !== '' &&
          (!isCorrectPassword ? (
            <span className={`flex justify-end w-[80%] ${styles.text}`}>
              Please use 8 to 15 characters of English case letters, numbers, and special characters
              for the password.
            </span>
          ) : currentPW === password ? (
            <span className={`flex justify-end w-[80%] ${styles.text}`}>
              Please choose a password different from your current one.
            </span>
          ) : null)}
      </div>
    </>
  );
}
