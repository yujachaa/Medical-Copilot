'use client';

import { useEffect, useRef, useState } from 'react';
import XrayImg from '@/assets/images/xrayImg.jpg';
import styles from './page.module.scss';
import Image from 'next/image';
import RectangleOverlay from '@/app/main/components/Diagnosis/components/report/RectangleOverlay';
import CanvasOverlay from '@/app/main/components/Diagnosis/components/report/CanvasOverlay';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

export default function PDFPage() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [coordinatesGroups, setCoordinatesGroups] = useState<CoordinatesGroup[]>([]);

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

  const plan = `Imaging : Perform a chest CT to futher evaluate the extent and cause of atelectasis,
                identifying any obstructive or compressive factors. Monitoring : Repeat chest
                imaging as clinically indicated to assess for resolution or progression of
                atelectasis.`;
  const immpression = `Right center lobe atelectasis, potentially due to bronchial obstruction (e.g., mucus
                plug, external compression by a nearby mass, or airway narrowing).`;

  const finding = `Increased opacity in the right lung zone, consistent with partial collapse or
                insufficient expansion of the ceter to the right. No significant shift of
                mediastinal structures, indicating that the atelectasis is likely due to an
                obstructive or compressive process rather than volume loss.`;

  useEffect(() => {
    const dummyCoordinatesGroups = generateCircleCoordinates();
    setCoordinatesGroups(dummyCoordinatesGroups);
  }, []);

  return (
    <div
      ref={pdfRef}
      className={styles.report}
    >
      <div className="font-bold text-3xl w-full">Medical Report</div>
      <div className={styles.infoArea}>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Patient Information</div>
          <div className={styles.infoBox}>
            {['Patient ID', 'Sex', 'Age', 'Registration No'].map((label, index) => (
              <div
                key={index}
                className="w-full"
              >
                <div className={styles.oneInfo}>
                  <div
                    className={`font-bold w-1/2 ${label === 'Registration No' ? 'tracking-tighter' : ''} max-1024:text-sm max-1024:w-1/2`}
                  >
                    {label}
                  </div>
                  <div className="flex gap-[2px]">
                    <div className="">:</div>
                    <div className="max-1024:text-sm">123456789</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Diagnosis</div>
          <div className={styles.infoBox}>
            {['Disease', 'Location', 'Size'].map((label, index) => (
              <div
                key={index}
                className="w-full"
              >
                <div className={styles.oneInfo}>
                  <div className={`font-bold w-1/3 max-1024:text-sm max-1024:w-1/2`}>{label}</div>
                  <div className="flex gap-[2px]">
                    <div className="">:</div>
                    <div className="max-1024:text-sm">123456789</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={styles.image}
          ref={imgWrapperRef}
        >
          <Image
            src={XrayImg}
            alt="이미지"
            width={250}
            height={250}
            onLoad={handleImageLoad} // 이미지 로드 완료 시 호출
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

      <div className={`${styles.analysisArea} flex flex-col gap-7`}>
        <div className={styles.field}>
          <div className="font-bold text-lg">Finding</div>
          <div className={styles.analysisBox}>{finding}</div>
        </div>

        <div className={styles.field}>
          <div className="font-bold text-lg">Impression</div>
          <div className={styles.analysisBox}>{immpression}</div>
        </div>

        <div className={styles.field}>
          <div className="font-bold text-lg">Plan</div>
          <div className={styles.analysisBox}>{plan}</div>
        </div>
      </div>
    </div>
  );
}
