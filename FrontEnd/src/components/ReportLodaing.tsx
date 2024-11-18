import React from 'react';
import styles from './ReportLodaing.module.scss';
import Image from 'next/image';
import Logo from '@/assets/images/Logo_Landing.png';

export default function ReportLodaing() {
  return (
    <div className={styles.right}>
      <div className={styles.rightbox}>
        <div>
          <Image
            src={Logo}
            alt="logo"
            width={170}
            height={170}
          />
        </div>
      </div>
    </div>
  );
}
