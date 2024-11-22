import { useState } from 'react';
import styles from './NameInput.module.scss';
import { updateName } from '@/apis/user';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setUserName } from '@/redux/features/user/userSlice';

export default function NameInput({ isNameInput }: { isNameInput: boolean }) {
  const [name, setName] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeName = async () => {
    const data = await updateName(name);
    if (data) {
      alert('이름이 수정되었습니다.');
      dispatch(setUserName(data.name));
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div
      className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isNameInput ? '40px' : '0px'}] items-start transition-all`}
    >
      <span></span>
      <input
        placeholder="New Name"
        className="w-[80%] h-[30px]"
        type="text"
        value={name}
        onChange={handleInputChange}
      />
      <span
        className={`${styles.setting1} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
        onClick={changeName}
      >
        변경
      </span>
      <span
        className={`${styles.setting2} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
        onClick={() => setName('')}
      >
        취소
      </span>
    </div>
  );
}
