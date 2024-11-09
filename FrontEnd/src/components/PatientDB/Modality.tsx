import styles from './Modality.module.scss';
import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { setModality } from '@/redux/features/main/mainSlice';

type Props = {
  onClose: () => void;
  onPatientClose: () => void;
};

export default function Modality({ onClose, onPatientClose }: Props) {
  const { modality } = useAppSelector((state) => state.main.patient);
  const dispatch = useAppDispatch();
  //기본적으로 MG를 선택함
  const [selectedModality, setSelectedModality] = useState<string>('MG');

  //값이 없다면 빈배열로 초기화
  const modalities = modality ? modality.split(',').map((item) => item.trim()) : [];

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>, modality: string) => {
    e.stopPropagation(); //버블링 방지
    setSelectedModality(modality);
  };

  const handleSetPatient = () => {
    //여기에 이미지를 불러오는 API를 추가할 예정입니다.
    dispatch(setModality(selectedModality));
    onClose();
    onPatientClose();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.box}`}>
        <div className={`${styles.title} flex items-center justify-between gap-4 pr-4 pl-4`}>
          <span>Click Your Modality</span>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className={styles.list}>
          {modalities.length === 0 ? (
            <span>NO Modality, so automatically select MG Plugin</span>
          ) : (
            modalities.map((modality, index) => (
              <div
                key={index}
                onClick={(e) => handleSelect(e, modality)}
                className={`${styles.modalityItem} ${selectedModality === modality ? styles.selected : styles.notselected}`}
              >
                {modality}
              </div>
            ))
          )}
        </div>
        <div className={styles.send}>
          <span onClick={() => handleSetPatient()}>Select</span>
        </div>
      </div>
    </div>
  );
}
