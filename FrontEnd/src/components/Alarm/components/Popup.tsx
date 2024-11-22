import { useRouter } from 'next/navigation';
import { Noti } from '../SSEHandler';
import styles from './Popup.module.scss';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setAlarmTab } from '@/redux/features/tab/tabSlice';

type PopupProps = {
  onClose: () => void;
  isClosing: boolean;
  data: Noti;
};

export default function Popup({ onClose, isClosing, data }: PopupProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const goReport = () => {
    if (data.id !== -1) {
      router.replace(`/medical/chat/${data.patientId}?reportId=${data.reportId}`);
      dispatch(setAlarmTab(data));
    }
    onClose();
  };

  return (
    <div className={`${styles.container} ${isClosing ? styles.slideDown : styles.slideUp}`}>
      <div className="w-full">
        <CgClose
          className="w-5 h-5 ml-auto cursor-pointer text-rgb0.5"
          onClick={onClose}
        />
        <div className="text-center font-bold text-2xl max-1024:text-xl">Notification!</div>
      </div>
      <div className="text-center text-lg max-1024:text-base">
        Analysis Complete!
        <br />
        {/* <br /> */}
        Please review your patient&apos;s diagnostic report.
      </div>
      <button
        className="font-bold text-lg max-1024:text-base bg-blue-btn text-white rounded-md py-2 px-3"
        onClick={goReport}
        aria-label="go report"
      >
        Go to report
      </button>
    </div>
  );
}
