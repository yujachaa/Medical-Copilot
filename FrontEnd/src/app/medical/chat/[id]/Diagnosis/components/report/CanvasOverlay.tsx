import { useRef, useEffect } from 'react';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

interface CanvasOverlayProps {
  coordinatesGroups: CoordinatesGroup[];
  imageSize: { width: number; height: number };
}

export default function CanvasOverlay({ coordinatesGroups, imageSize }: CanvasOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // canvas의 실제 픽셀 크기를 현재 이미지 크기에 맞춤
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // canvas 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;

    // 좌표 그룹을 반복하여 그리기
    coordinatesGroups.forEach((group) => {
      if (group.points.length > 0) {
        ctx.beginPath();
        group.points.forEach((point, index) => {
          const x = point.x * imageSize.width; // 비율 좌표를 실제 크기로 변환
          const y = point.y * imageSize.height; // 비율 좌표를 실제 크기로 변환
          if (index === 0) {
            ctx.moveTo(x, y); // 시작점 설정
          } else {
            ctx.lineTo(x, y); // 좌표 연결
          }
        });
        ctx.stroke();
      }
    });
  }, [coordinatesGroups, imageSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
