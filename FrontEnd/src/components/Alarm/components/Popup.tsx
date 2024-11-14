import styles from './Popup.module.scss';
import { CgClose } from '@react-icons/all-files/cg/CgClose';

type PopupProps = {
  onClose: () => void;
  isClosing: boolean;
};

export default function Popup({ onClose, isClosing }: PopupProps) {
  const goReport = () => {
    console.log('리포트 보러 가기!!');
    // (예정) 알림정보로 채팅페이지로 이동 & 해당 리포트 띄워주기 추가
  };

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideDown : styles.slideUp}`}>
      <div className="w-full">
        <CgClose
          className="w-5 h-5 ml-auto cursor-pointer text-rgb0.5"
          onClick={onClose}
        />
        <div className="text-center font-bold text-2xl">Notification!</div>
      </div>
      <div className="text-center text-lg">
        Analysis Complete!
        <br />
        <br />
        Please review your patient&apos;s diagnostic report.
      </div>
      <button
        className="font-bold text-lg bg-blue-btn text-white rounded-md py-2 px-3"
        onClick={goReport}
        aria-label="go report"
      >
        Go to report
      </button>
    </div>
  );
}
