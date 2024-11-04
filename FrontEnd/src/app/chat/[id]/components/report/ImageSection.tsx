import Image from 'next/image';
import styles from './ReportData.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';

export default function ImageSection() {
  return (
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
  );
}
