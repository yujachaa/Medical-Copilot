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
// import { updateDrawing } from '@/apis/report';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { setCoordinates } from '@/redux/features/report/coordinateSlice';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

type EditModalProps = {
  onClose: () => void;
  // onSaveCoordinates: (
  //   groups: CoordinatesGroup[],
  //   // imageSize: { width: number; height: number },
  // ) => void;
  // reportId?: string;
};

export default function EditModal({ onClose }: EditModalProps) {
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinatesGroups, setCoordinatesGroups] = useState<CoordinatesGroup[]>([]);
  // Redux에서 coordinates 상태를 가져옴
  const coordinatesFromRedux = useAppSelector((state) => state.coordinate.coordinates);
  const dispatch = useAppDispatch();

  const [undoStack, setUndoStack] = useState<CoordinatesGroup[][]>([]);
  const [redoStack, setRedoStack] = useState<CoordinatesGroup[][]>([]);
  // const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  // 컴포넌트 마운트 시 Redux 상태를 로컬 상태의 초기값으로 설정
  useEffect(() => {
    setCoordinatesGroups(coordinatesFromRedux);
  }, [coordinatesFromRedux]);

  // useEffect(() => {
  //   if (imgWrapperRef.current) {
  //     const { offsetWidth, offsetHeight } = imgWrapperRef.current;
  //     // setImageSize({ width: offsetWidth, height: offsetHeight });
  //   }
  // }, [imgWrapperRef]);

  const saveSnapshot = () => {
    setUndoStack((prev) => {
      const updatedStack = [...prev, JSON.parse(JSON.stringify(coordinatesGroups))];
      return updatedStack.length > 20 ? updatedStack.slice(1) : updatedStack; // 최대 20개까지 저장
    });
    setRedoStack([]); // 새로운 변경이 생기면 redoStack을 초기화
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !imgWrapperRef.current) return;

    if (selectedButton === 'pencil' || selectedButton === 'eraser') {
      setIsDrawing(true);
      saveSnapshot(); // 그리기 시작할 때 스냅샷 저장
    }

    if (selectedButton === 'pencil') {
      const rect = imgWrapperRef.current.getBoundingClientRect();
      const x = parseFloat(((e.clientX - rect.left) / rect.width).toFixed(3));
      const y = parseFloat(((e.clientY - rect.top) / rect.height).toFixed(3));

      setCoordinatesGroups((prev) => [...prev, { points: [{ x, y }] }]);

      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x * rect.width, y * rect.height);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !imgWrapperRef.current) return;

    const rect = imgWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawing && selectedButton === 'eraser') {
      const eraserSize = 20;
      setCoordinatesGroups((prev) => {
        const updatedGroups: CoordinatesGroup[] = [];
        prev.forEach((group) => {
          const isInEraserArea = group.points.some((point) => {
            const pointX = point.x * rect.width;
            const pointY = point.y * rect.height;
            return (
              pointX >= x - eraserSize / 2 &&
              pointX <= x + eraserSize / 2 &&
              pointY >= y - eraserSize / 2 &&
              pointY <= y + eraserSize / 2
            );
          });

          if (!isInEraserArea) {
            updatedGroups.push(group);
          }
        });

        if (canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          updatedGroups.forEach((group) => {
            ctx.beginPath();
            group.points.forEach((point, index) => {
              const drawX = point.x * canvas.width;
              const drawY = point.y * canvas.height;
              if (index === 0) {
                ctx.moveTo(drawX, drawY);
              } else {
                ctx.lineTo(drawX, drawY);
              }
            });
            ctx.stroke();
          });
        }
        return updatedGroups;
      });
    } else if (isDrawing && selectedButton === 'pencil') {
      ctx.lineTo(x, y);
      ctx.stroke();

      const relX = parseFloat((x / rect.width).toFixed(3));
      const relY = parseFloat((y / rect.height).toFixed(3));
      setCoordinatesGroups((prev) => {
        const updatedGroups = [...prev];
        const currentGroup = updatedGroups[updatedGroups.length - 1];
        currentGroup.points.push({ x: relX, y: relY });
        return updatedGroups;
      });
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    setRedoStack((prev) => [coordinatesGroups, ...prev]);
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setCoordinatesGroups(previousState);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        previousState.forEach((group) => {
          ctx.beginPath();
          group.points.forEach((point, index) => {
            const x = point.x * canvas.width;
            const y = point.y * canvas.height;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();
        });
      }
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    setUndoStack((prev) => [...prev, coordinatesGroups]);
    const nextState = redoStack[0];
    setRedoStack((prev) => prev.slice(1));
    setCoordinatesGroups(nextState);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nextState.forEach((group) => {
          ctx.beginPath();
          group.points.forEach((point, index) => {
            const x = point.x * canvas.width;
            const y = point.y * canvas.height;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.stroke();
        });
      }
    }
  };

  const handleTrash = () => {
    if (confirm('모든 좌표를 지우겠습니까? 복구할 수 없습니다.')) {
      setCoordinatesGroups([]);
      setUndoStack([]);
      setRedoStack([]);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    }
  };

  const handleCheck = async () => {
    // onSaveCoordinates(coordinatesGroups, imageSize);
    // onSaveCoordinates(coordinatesGroups);
    dispatch(setCoordinates(coordinatesGroups));
    console.log('좌표', coordinatesGroups);
    // if (reportId) {
    //   const data = await updateDrawing(reportId, coordinatesGroups);
    //   console.log('업데이트 후 응답!!!!!!!!!!:', data);
    // }
  };

  const handleClose = () => {
    if (
      coordinatesGroups.length > 0 &&
      confirm('저장하지 않은 정보는 사라집니다. 나가시겠습니까?')
    ) {
      setCoordinatesGroups([]);
      onClose();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 2;

    if (coordinatesFromRedux.length > 0) {
      // 좌표 그룹을 반복하여 그리기
      coordinatesFromRedux.forEach((group) => {
        if (group.points.length > 0) {
          ctx.beginPath();
          group.points.forEach((point, index) => {
            const x = point.x * canvas.width; // 비율 좌표를 실제 크기로 변환
            const y = point.y * canvas.height; // 비율 좌표를 실제 크기로 변환
            if (index === 0) {
              ctx.moveTo(x, y); // 시작점 설정
            } else {
              ctx.lineTo(x, y); // 좌표 연결
            }
          });
          ctx.stroke();
        }
      });
    }
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <CgClose
          className="absolute right-2 top-2 cursor-pointer text-rgb0.5"
          onClick={handleClose}
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
            onClick={handleUndo}
          >
            {selectedButton === 'undo' ? <IoArrowUndo /> : <IoArrowUndoOutline />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'redo' ? styles.selected : ''}`}
            onClick={handleRedo}
          >
            {selectedButton === 'redo' ? <IoArrowRedoSharp /> : <IoArrowRedoOutline />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'trash' ? styles.selected : ''}`}
            onClick={handleTrash}
          >
            {selectedButton === 'trash' ? <HiTrash /> : <HiOutlineTrash />}
          </div>
          <div
            className={`${styles.btn} ${selectedButton === 'check' ? styles.selected : ''}`}
            onClick={handleCheck}
          >
            {selectedButton === 'check' ? <BsCheckCircleFill /> : <BsCheckCircle />}
          </div>
        </div>
      </div>
    </div>
  );
}
