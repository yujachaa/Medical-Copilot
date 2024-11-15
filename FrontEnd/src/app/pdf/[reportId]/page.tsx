'use client';

import { useRef, useState } from 'react';
import xrayDefault from '@/assets/images/xray-default.webp';
import styles from './page.module.scss';
import Image from 'next/image';
import RectangleOverlay from '@/app/medical/chat/[id]/components/report/RectangleOverlay';
import CanvasOverlay from '@/app/medical/chat/[id]/components/report/CanvasOverlay';
import { useAppSelector } from '@/redux/store/hooks/store';

export default function PDFPage() {
  const finding = useAppSelector((state) => state.fip.finding);
  const impression = useAppSelector((state) => state.fip.impression);
  const plan = useAppSelector((state) => state.fip.plan);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<HTMLDivElement | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const coordinatesFromRedux = useAppSelector((state) => state.coordinate.coordinates);
  const { reportData } = useAppSelector((state) => state.report);

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
    <div
      ref={pdfRef}
      className={styles.report}
    >
      <div className="font-bold text-3xl w-full">Medical Report</div>
      <div className={styles.infoArea}>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Patient Information</div>
          <div className={styles.infoBox}>
            {['Patient ID', 'Sex', 'Age', 'Visit Date'].map((label, index) => {
              let value = ''; // 기본값 설정
              if (reportData) {
                // reportData가 있을 때 각 label에 맞는 값을 설정
                if (label === 'Patient ID') value = reportData.pid;
                else if (label === 'Sex') value = reportData.sex || '';
                else if (label === 'Age') value = reportData.age.toString();
                else if (label === 'Visit Date') value = reportData.shootingDate;
              }

              return (
                <div
                  key={index}
                  className="w-full"
                >
                  <div className={styles.oneInfo}>
                    <div
                      id="element-id"
                      // className={`font-bold w-1/2 ${label === 'Visit Date' ? 'tracking-tighter max-1024:tracking-[-.13em]' : ''} max-1024:text-sm max-1024:w-1/2`}
                      className={`font-bold w-[40%] max-1024:text-sm`}
                    >
                      {label}
                    </div>
                    <div className="flex gap-[2px]">
                      <div className="">:</div>
                      <div className="max-1024:text-sm">{value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${styles.info}`}>
          <div className="font-bold text-lg">Diagnosis</div>
          <div className={styles.infoBox}>
            {['Disease', 'Location', 'Size'].map((label, index) => {
              let value = ''; // 기본값 설정
              if (reportData) {
                // reportData가 있을 때 각 label에 맞는 값을 설정
                if (label === 'Disease') value = reportData.disease || '';
                else if (label === 'Location') value = reportData.location || '';
                else if (label === 'Size') value = reportData.size;
              }

              return (
                <div
                  key={index}
                  className="w-full"
                >
                  <div className={styles.oneInfo}>
                    <div className={`font-bold w-1/3 max-1024:text-sm max-1024:w-1/2`}>{label}</div>
                    <div className="flex gap-[2px]">
                      <div className="">:</div>
                      <div className="max-1024:text-sm">{value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={styles.image}
          ref={imgWrapperRef}
        >
          <Image
            src={reportData?.imageUrl || xrayDefault} // 기본 이미지 URL 설정
            alt="이미지"
            width={250}
            height={250}
            onLoad={handleImageLoad} // 이미지 로드 완료 시 호출
            priority
          />
          {isImageLoaded && <RectangleOverlay imgWrapperRef={imgWrapperRef} />}
          {isImageLoaded && (
            <CanvasOverlay
              coordinatesGroups={coordinatesFromRedux}
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
          <div className={styles.analysisBox}>{impression}</div>
        </div>

        <div className={styles.field}>
          <div className="font-bold text-lg">Plan</div>
          <div className={styles.analysisBox}>{plan}</div>
        </div>
      </div>
    </div>
  );
}
