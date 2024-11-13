'use client';

import { useEffect, useState } from 'react';

type RectangleOverlayProps = {
  imgWrapperRef: React.RefObject<HTMLDivElement>;
};

export default function RectangleOverlay({ imgWrapperRef }: RectangleOverlayProps) {
  const [rectPosition, setRectPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    // console.log(
    //   'useEffect',
    //   imgWrapperRef.current ? imgWrapperRef.current.getBoundingClientRect().width : null,
    // );
    const updateRectanglePosition = () => {
      if (imgWrapperRef.current) {
        const wrapperRect = imgWrapperRef.current.getBoundingClientRect();

        // 원본 이미지 크기 및 비율 계산
        const originalWidth = 1024; // 원본 이미지의 가로 크기 (예시 값)
        const originalHeight = 1024; // 원본 이미지의 세로 크기 (예시 값)
        const scaleX = wrapperRect.width / originalWidth;
        const scaleY = wrapperRect.height / originalHeight;

        // 좌표를 현재 이미지 비율로 변환
        const Box_X1 = 355.113037109375;
        const Box_Y1 = 634.580810546875;
        const Width = 80.572998046875;
        const Height = 92.102783203125;

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
  }, [imgWrapperRef]);

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
    />
  );
}
