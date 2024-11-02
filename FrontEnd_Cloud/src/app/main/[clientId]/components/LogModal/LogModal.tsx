import styles from './LogModal.module.scss';
import { IoCloseOutline } from 'react-icons/io5';

export default function LogModal({
  setLogModal,
}: {
  setLogModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={`${styles.main} flex justify-center absolute`}>
      <div
        className={`${styles.logbox} w-[30%] h-[80%] mt-[2%] min-h-[500px] rounded-[20] pl-5 pr-5`}
      >
        <div className={`${styles.title} flex justify-between h-[90px] items-center`}>
          <span>LOG</span>
          <IoCloseOutline
            onClick={() => {
              setLogModal((prev) => !prev);
            }}
          />
        </div>
        <div className={`${styles.logItems} rounded-[20] border`}></div>
      </div>
    </div>
  );
}
