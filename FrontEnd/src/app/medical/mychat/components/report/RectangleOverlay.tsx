'use client';

import { useAppSelector } from '@/redux/store/hooks/store';
import { useEffect, useState } from 'react';

type RectangleOverlayProps = {
  imgWrapperRef: React.RefObject<HTMLDivElement>;
};

export default function RectangleOverlay({ imgWrapperRef }: RectangleOverlayProps) {
  const { reportData } = useAppSelector((state) => state.report);
  const [rectPosition, setRectPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateRectanglePosition = () => {
      if (imgWrapperRef.current && reportData) {
        const wrapperRect = imgWrapperRef.current.getBoundingClientRect();

        // 원본 이미지 크기 및 비율 계산
        const originalWidth = 1024; // 원본 이미지의 가로 크기 (예시 값)
        const originalHeight = 1024; // 원본 이미지의 세로 크기 (예시 값)
        const scaleX = wrapperRect.width / originalWidth;
        const scaleY = wrapperRect.height / originalHeight;

        // 좌표를 현재 이미지 비율로 변환
        const Box_X1 = reportData.detection.Box_X1;
        const Box_Y1 = reportData.detection.Box_Y1;
        const Width = reportData.detection.Width;
        const Height = reportData.detection.Height;

        const rect = {
          top: Box_Y1 * scaleY,
          left: Box_X1 * scaleX,
          width: Width * scaleX,
          height: Height * scaleY,
        };
        setRectPosition(rect);
      }
    };

    updateRectanglePosition();
    window.addEventListener('resize', updateRectanglePosition);

    return () => {
      window.removeEventListener('resize', updateRectanglePosition);
    };
  }, [imgWrapperRef, reportData]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${rectPosition.top}px`,
        left: `${rectPosition.left}px`,
        width: `${rectPosition.width}px`,
        height: `${rectPosition.height}px`,
        border: '2px solid red',
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '-16px',
          left: '-2px',
          // backgroundColor: 'rgba(255, 255, 255, 0.7)',
          // padding: '2px 4px',
          fontSize: '10px',
          color: 'red',
          whiteSpace: 'nowrap', // 줄바꿈 방지
          overflow: 'visible', // div 밖으로 나와도 보이도록 설정
        }}
      >
        {reportData?.disease}
      </span>
    </div>
  );
}
