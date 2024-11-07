import styles from './PWInput.module.scss';

export default function PWInput({ isPWInput }: { isPWInput: boolean }) {
  return (
    <>
      <div
        className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isPWInput ? '40px' : '0px'}] items-start`}
      >
        <span></span>
        <input
          placeholder="Current Password"
          className={`w-[80%] h-[30px]`}
          type="text"
        />
      </div>
      <div
        className={`${styles.main} grid grid-cols-[1fr_2fr_0.5fr_0.5fr] h-[${isPWInput ? '40px' : '0px'}] items-start`}
      >
        <span></span>
        <input
          placeholder="New Password"
          className={`w-[80%] h-[30px]`}
          type="text"
        />
        <span
          className={`${styles.setting1} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
        >
          변경
        </span>
        <span
          className={`${styles.setting2} w-[50px] h-[30px] flex justify-center items-center rounded-[10px]`}
        >
          취소
        </span>
      </div>
    </>
  );
}
