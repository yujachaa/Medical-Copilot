'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import styles from './ReportData.module.scss';
import XrayImg from '@/assets/images/xrayImg.webp';
import { MdOutlineDraw } from 'react-icons/md';
import EditModal from './EditModal';
import RectangleOverlay from './RectangleOverlay';

export default function ImageSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className={`${styles.info}`}>
      <div>Image</div>
      <div className={styles.image}>
        <div
          className={styles.imgWrapper}
          ref={imgWrapperRef}
        >
          <Image
            src={XrayImg}
            alt="이미지"
            width={640}
            height={640}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            onLoad={handleImageLoad} // 이미지 로드 완료 시 호출
          />
          {isImageLoaded && <RectangleOverlay imgWrapperRef={imgWrapperRef} />}
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
