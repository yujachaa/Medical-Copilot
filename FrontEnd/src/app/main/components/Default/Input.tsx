'use client';
import React, { useState } from 'react';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';
import { FaDatabase } from 'react-icons/fa6';
import PatientDB from '@/components/PatientDB/PatientDB';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { moveTab } from '@/redux/features/tab/tabSlice';
import { Patient } from '@/redux/features/main/mainSlice';

export default function Input() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const Patient = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const CloseModal = () => {
    setPatientModal(false);
  };

  const handleSend = async (data: Patient) => {
    //여기에 AI에게 명령을 보내는 코드를 작성
    //ex ) modality === '' ? 'default' : 'cxr'
    //환자가 선택이 안되면 그 채팅 모아두는 곳으로 전송 -> 이게 mainSlice의 initial값으로 사용될듯!
    dispatch(moveTab(data));
  };

  return (
    <div className={styles.container}>
      <div className={styles.pid}>PID : {Patient.pid}</div>
      <label
        className={styles.file}
        onClick={() => setPatientModal(true)}
      >
        <FaDatabase className="w-5 h-5 text-clip" />
      </label>
      {isPatientModal && <PatientDB onClose={CloseModal} />}
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your search query"
      />
      <Send
        className={'w-7 text-clip blue-logo ml-auto mr-5 cursor-pointer'}
        onClick={() => handleSend(Patient)}
      />
    </div>
  );
}
