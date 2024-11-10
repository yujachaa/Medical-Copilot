import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './EditModal.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';
import { CgClose } from '@react-icons/all-files/cg/CgClose';
import { IoArrowRedoOutline } from '@react-icons/all-files/io5/IoArrowRedoOutline';
import { IoArrowRedoSharp } from '@react-icons/all-files/io5/IoArrowRedoSharp';
import { IoArrowUndo } from '@react-icons/all-files/io5/IoArrowUndo';
import { IoArrowUndoOutline } from '@react-icons/all-files/io5/IoArrowUndoOutline';
import { HiOutlinePencil, HiOutlineTrash, HiPencil, HiTrash } from 'react-icons/hi2';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';
import RectangleOverlay from './RectangleOverlay';
import { PiEraser, PiEraserFill } from 'react-icons/pi';

type EditModalProps = {
  onClose: () => void;
};

export default function EditModal({ onClose }: EditModalProps) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName === selectedButton ? null : buttonName);
  };

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
            // style={{ position: 'relative', maxWidth: '600px' }}
          >
            <Image
              src={XrayImg}
              alt="이미지"
              fill
              // sizes="(max-width: 600px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            <RectangleOverlay imgWrapperRef={imgWrapperRef} />
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
