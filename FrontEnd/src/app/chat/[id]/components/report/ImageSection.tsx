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
        <Image
          src={XrayImg}
          alt="이미지"
          width={250}
          height={250}
        />
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
