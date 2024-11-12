'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import styles from './ReportData.module.scss';
import { MdOutlineDraw } from 'react-icons/md';
import EditModal from './EditModal';
import RectangleOverlay from './RectangleOverlay';
import CanvasOverlay from './CanvasOverlay';
import { useAppSelector } from '@/redux/store/hooks/store';

export default function ImageSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { reportData } = useAppSelector((state) => state.report);
  const { coordinates } = useAppSelector((state) => state.coordinate);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    if (imgWrapperRef.current) {
      setImageSize({
        width: imgWrapperRef.current.offsetWidth,
        height: imgWrapperRef.current.offsetHeight,
      });
    }
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
            src={reportData?.imageUrl || '/src/assets/images/xray-default'} // 기본 이미지 URL 설정
            alt="이미지"
            fill
            style={{ objectFit: 'cover' }}
            onLoad={handleImageLoad}
            priority
          />
          {isImageLoaded && <RectangleOverlay imgWrapperRef={imgWrapperRef} />}
          {isImageLoaded && (
            <CanvasOverlay
              coordinatesGroups={coordinates}
              imageSize={imageSize}
            />
          )}
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
