import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './EditModal.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';
import { CgClose } from 'react-icons/cg';
import { HiOutlinePencil, HiOutlineTrash, HiPencil, HiTrash } from 'react-icons/hi2';
import { PiEraser, PiEraserFill } from 'react-icons/pi';
import {
  IoArrowUndoOutline,
  IoArrowRedoOutline,
  IoArrowUndo,
  IoArrowRedoSharp,
} from 'react-icons/io5';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import RectangleOverlay from './RectangleOverlay';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

type EditModalProps = {
  onClose: () => void;
  onSaveCoordinates: (
    groups: CoordinatesGroup[],
    imageSize: { width: number; height: number },
  ) => void;
};

export default function EditModal({ onClose, onSaveCoordinates }: EditModalProps) {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinatesGroups, setCoordinatesGroups] = useState<CoordinatesGroup[]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  useEffect(() => {
    if (imgWrapperRef.current) {
      const { offsetWidth, offsetHeight } = imgWrapperRef.current;
      setImageSize({ width: offsetWidth, height: offsetHeight });
      console.log('현재 이미지 표시 크기:', { offsetWidth, offsetHeight });
    }
  }, [imgWrapperRef]);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !imgWrapperRef.current) return;

    const rect = imgWrapperRef.current.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width).toFixed(3)); // x 좌표 비율 (0 ~ 1) 소수점 3자리
    const y = parseFloat(((e.clientY - rect.top) / rect.height).toFixed(3)); // y 좌표 비율 (0 ~ 1) 소수점 3자리

    setIsDrawing(true);
    // 새로운 그룹을 시작하고 첫 좌표 추가 (비율로 저장)
    setCoordinatesGroups((prev) => [...prev, { points: [{ x, y }] }]);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x * rect.width, y * rect.height); // 화면 크기에 맞춰 그림
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !imgWrapperRef.current) return;

    const rect = imgWrapperRef.current.getBoundingClientRect();
    const x = parseFloat(((e.clientX - rect.left) / rect.width).toFixed(3)); // x 좌표 비율 (0 ~ 1) 소수점 3자리
    const y = parseFloat(((e.clientY - rect.top) / rect.height).toFixed(3)); // y 좌표 비율 (0 ~ 1) 소수점 3자리

    ctx.lineTo(x * rect.width, y * rect.height); // 화면 크기에 맞춰 그림
    ctx.stroke();

    // 현재 그룹에 비율 좌표 추가
    setCoordinatesGroups((prev) => {
      const updatedGroups = [...prev];
      const currentGroup = updatedGroups[updatedGroups.length - 1];
      currentGroup.points.push({ x, y });
      return updatedGroups;
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    console.log(coordinatesGroups);
    onSaveCoordinates(coordinatesGroups, imageSize); // 좌표 그룹과 이미지 크기 전달
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
      }
    }
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <CgClose
          className="absolute right-2 top-2 cursor-pointer text-rgb0.5"
          onClick={onClose}
        />
        <p className="font-black text-2xl">Image Edit</p>
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
            />
            <RectangleOverlay imgWrapperRef={imgWrapperRef} />
            <canvas
              ref={canvasRef}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
        </div>
        <div className={styles.buttonArea}>
          <div
            className={`${styles.btn} ${selectedButton === 'pencil' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('pencil')}
          >
            {selectedButton === 'pencil' ? <HiPencil /> : <HiOutlinePencil />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'eraser' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('eraser')}
          >
            {selectedButton === 'eraser' ? <PiEraserFill /> : <PiEraser />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'undo' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('undo')}
          >
            {selectedButton === 'undo' ? <IoArrowUndo /> : <IoArrowUndoOutline />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'redo' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('redo')}
          >
            {selectedButton === 'redo' ? <IoArrowRedoSharp /> : <IoArrowRedoOutline />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'trash' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('trash')}
          >
            {selectedButton === 'trash' ? <HiTrash /> : <HiOutlineTrash />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'check' ? styles.selected : ''}`}
            onClick={() => handleButtonClick('check')}
          >
            {selectedButton === 'check' ? <BsCheckCircleFill /> : <BsCheckCircle />}
          </div>
        </div>
      </div>
    </div>
  );
}
