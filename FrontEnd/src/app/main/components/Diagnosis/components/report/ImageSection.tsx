'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import styles from './ReportData.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';
import { MdOutlineDraw } from 'react-icons/md';
import EditModal from './EditModal';
import RectangleOverlay from './RectangleOverlay';
import CanvasOverlay from './CanvasOverlay';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

export default function ImageSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [coordinatesGroups, setCoordinatesGroups] = useState<CoordinatesGroup[]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

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

  // 더미 좌표 데이터 - 동그라미 10개의 비율 좌표 그룹을 생성
  const generateCircleCoordinates = () => {
    const circles = Array.from({ length: 10 }, (_, circleIndex) => {
      const radius = 0.1; // 비율 반지름 (예: 전체 이미지의 10%)
      const centerX = 0.1 + circleIndex * 0.08; // 중심 x 좌표 비율
      const centerY = 0.2 + circleIndex * 0.05; // 중심 y 좌표 비율

      // 108개의 점을 원주 위에 배치
      const points = Array.from({ length: 108 }, (_, pointIndex) => {
        const angle = (2 * Math.PI * pointIndex) / 108; // 각 점의 각도
        const x = parseFloat((centerX + radius * Math.cos(angle)).toFixed(3));
        const y = parseFloat((centerY + radius * Math.sin(angle)).toFixed(3));
        return { x, y };
      });

      return { points };
    });

    return circles;
  };

  useEffect(() => {
    const dummyCoordinatesGroups = generateCircleCoordinates();
    setCoordinatesGroups(dummyCoordinatesGroups);
  }, []);

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
            fill
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            onLoad={handleImageLoad}
          />
          {isImageLoaded && <RectangleOverlay imgWrapperRef={imgWrapperRef} />}
          {isImageLoaded && (
            <CanvasOverlay
              coordinatesGroups={coordinatesGroups}
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

      {isModalOpen && (
        <EditModal
          onClose={closeModal}
          onSaveCoordinates={setCoordinatesGroups}
        />
      )}
    </div>
  );
}
