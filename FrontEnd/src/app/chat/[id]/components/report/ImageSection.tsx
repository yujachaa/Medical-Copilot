'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './ReportData.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';
import { MdOutlineDraw } from 'react-icons/md';
import EditModal from './EditModal';

export default function ImageSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${styles.info}`}>
      <div>Image</div>
      <div className={styles.image}>
        <div className={styles.imgWrapper}>
          <Image
            src={XrayImg}
            alt="이미지"
            fill // fill 속성 사용
            style={{ objectFit: 'cover' }} // 이미지를 부모 컨테이너에 맞추기 위한 스타일
          />
        </div>
      </div>
      <div
        className={styles.editorBtn}
        onClick={openModal}
      >
        <MdOutlineDraw />
      </div>

      {isModalOpen && <EditModal onClose={closeModal} />}
    </div>
  );
}
