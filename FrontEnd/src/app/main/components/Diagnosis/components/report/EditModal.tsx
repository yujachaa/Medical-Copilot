import { useState } from 'react';
import Image from 'next/image';
import styles from './EditModal.module.scss';
import XrayImg from '@/assets/images/xrayImg.jpg';
import { CgClose } from 'react-icons/cg';
import { BiEraser, BiPencil, BiSolidEraser, BiSolidPencil } from 'react-icons/bi';
import {
  IoArrowRedoOutline,
  IoArrowRedoSharp,
  IoArrowUndo,
  IoArrowUndoOutline,
} from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import { HiTrash } from 'react-icons/hi2';
import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

type EditModalProps = {
  onClose: () => void;
};

export default function EditModal({ onClose }: EditModalProps) {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

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
          <Image
            src={XrayImg}
            alt="이미지"
            fill
            sizes="(max-width: 600px) 100vw, 50vw"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className={styles.buttonArea}>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('pencil')}
          >
            {selectedButton === 'pencil' ? <BiSolidPencil /> : <BiPencil />}
          </div>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('eraser')}
          >
            {selectedButton === 'eraser' ? <BiSolidEraser /> : <BiEraser />}
          </div>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('undo')}
          >
            {selectedButton === 'undo' ? <IoArrowUndo /> : <IoArrowUndoOutline />}
          </div>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('redo')}
          >
            {selectedButton === 'redo' ? <IoArrowRedoSharp /> : <IoArrowRedoOutline />}
          </div>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('trash')}
          >
            {selectedButton === 'trash' ? <HiTrash /> : <HiOutlineTrash />}
          </div>
          <div
            className={styles.btn}
            onClick={() => handleButtonClick('check')}
          >
            {selectedButton === 'check' ? <BsCheckCircleFill /> : <BsCheckCircle />}
          </div>
        </div>
        {/* 이미지 편집 기능 추가 */}
      </div>
    </div>
  );
}
