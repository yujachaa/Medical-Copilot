import { ReportDataType } from '@/types/report';

export default function RectangleOverlayPdf({ reportData }: { reportData: ReportDataType }) {
  // 원본 이미지 크기 및 비율 계산
  const scaleX = 165.242 / 1024;
  const scaleY = 165.242 / 1024;

  // 좌표를 현재 이미지 비율로 변환
  const Box_X1 = reportData.detection.Box_X1;
  const Box_Y1 = reportData.detection.Box_Y1;
  const Width = reportData.detection.Width;
  const Height = reportData.detection.Height;

  const rectPosition = {
    top: Box_Y1 * scaleY,
    left: Box_X1 * scaleX,
    width: Width * scaleX,
    height: Height * scaleY,
  };

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
        {reportData.disease}
      </span>
    </div>
  );
}
