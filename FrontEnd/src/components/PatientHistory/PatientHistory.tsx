import styles from './PatientHistory.module.scss';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaSortDown } from 'react-icons/fa';
// import { FaSortUp } from "react-icons/fa";

type Props = {
  onClose?: () => void;
  isAnimate?: boolean;
};

export default function PatientHistory({ onClose, isAnimate }: Props) {
  return (
    <div
      className={` ${!isAnimate ? styles.main : styles.mainOut} flex justify-center items-center`}
    >
      <div
        className={`${styles.box} w-[35%] min-w-[490px] h-[90%] min-h-[400px] rounded-[20px] flex flex-col p-4 gap-3`}
      >
        <div className={`${styles.title} flex items-center justify-between`}>
          <span>Patient History</span>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className={`${styles.table} w-full h-full flex flex-col gap-5`}>
          <div
            className={`${styles.head} grid grid-cols-[1.3fr_1fr_1fr_2fr] w-full, h-[40px] min-h-[40px]`}
          >
            <div className={`flex justify-center items-center gap-1`}>
              <span>PID</span>
              <FaSortDown className={`${styles.down}`} />
            </div>
            <span>SEX</span>
            <span>AGE</span>
            <span>Summary</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
          <div
            className={`${styles.body} grid grid-cols-[1.3fr_1fr_1fr_2fr] h-[50px] min-h-[50px] rounded-[10px]`}
          >
            <span>1373</span>
            <span>M</span>
            <span>58</span>
            <span>CXR-Pneumonia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
