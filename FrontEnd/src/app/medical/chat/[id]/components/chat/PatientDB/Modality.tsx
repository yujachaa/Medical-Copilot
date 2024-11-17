import styles from './Modality.module.scss';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { IoMdCloseCircleOutline } from '@react-icons/all-files/io/IoMdCloseCircleOutline';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { setPatientModality, setRequestModality } from '@/redux/features/tab/tabSlice';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  onPatientClose: () => void;
  newDbFlag: Dispatch<SetStateAction<boolean>>;
};

export default function Modality({ onClose, onPatientClose, newDbFlag }: Props) {
  const { tablist, selectedIndex } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  //기본적으로 MG를 선택함
  const [selectedModality, setSelectedModality] = useState<string>('MG');

  //값이 없다면 빈배열로 초기화

  const modalities = tablist[selectedIndex].patient!.modality ? ['CXR', 'MG'] : [];
  const handleSelect = (e: React.MouseEvent<HTMLDivElement>, modality: string) => {
    e.stopPropagation(); //버블링 방지
    setSelectedModality(modality);
  };

  const handleSetPatient = () => {
    dispatch(setRequestModality(selectedModality));
    dispatch(setPatientModality(selectedModality));
    onClose();
    onPatientClose();
    newDbFlag(true);
    console.log('새 db 선택했음!');
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.box}`}>
        <div className={`${styles.title} flex items-center justify-between gap-4 pr-4 pl-4`}>
          <span>Select Modality</span>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className={`${styles.list} w-full h-[150px] flex justify-between gap-6`}>
          {['MG', 'CXR', 'CT', 'CAPSULE'].map((modality, index) => {
            return (
              <div
                key={index}
                className={`${!modalities.includes(modality) && styles.notInclude} ${styles.modality} ${modality === selectedModality && styles.selected} w-[110px] h-[150px] rounded-[10px] flex flex-col items-center justify-center gap-2 cursor-pointer`}
                onClick={(e) => {
                  if (modalities.includes(modality)) {
                    handleSelect(e, modality);
                  }
                }}
              >
                <Image
                  className={`rounded-[10px]`}
                  alt="cxr"
                  src={`/${modality}.png`}
                  width={100}
                  height={100}
                />
                {modality}
              </div>
            );
          })}
          {/* {modalities.length === 0 ? (
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
          )} */}
        </div>
        <div className={styles.send}>
          <span onClick={() => handleSetPatient()}>Select</span>
        </div>
      </div>
    </div>
  );
}
