import Image from 'next/image';
import styles from './ReportData.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';

export default function ReportData() {
  return (
    <div className={styles.container}>
      <div className={`${styles.info}`}>
        <div>Image</div>
        <div className={styles.image}>
          <Image
            src={XrayImg}
            alt="이미지"
            width={250}
            height={250}
          />
        </div>
      </div>
      <div className={`${styles.info}`}>
        <div>Patient Information</div>
        <div className={styles.infoBox}>
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Patient ID</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
          <hr />
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Sex</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
          <hr />

          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Age</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
          <hr />

          <div className={styles.oneInfo}>
            <div className="text-white flex-grow tracking-tighter	">• Shooting Date</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.info}`}>
        <div>Diagnosis</div>
        <div className={styles.infoBox}>
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Labels</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>

          <hr />

          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Location</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
          <hr />
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Size</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
          <hr />
          <div className={styles.oneInfo}>
            <div className="text-white flex-grow">• Symtoms</div>
            <div className="flex gap-[2px]">
              <div className="text-white">|</div>
              <input className={styles.infoInput} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
