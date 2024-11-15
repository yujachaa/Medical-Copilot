'use client';
import React, { useState } from 'react';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import dynamic from 'next/dynamic';
const PatientDB = dynamic(() => import('@/components/PatientDB/PatientDB'), { ssr: false });
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTempTab } from '@/redux/features/tab/tabSlice';
import { Patient } from '@/redux/features/main/mainSlice';
import { fetchCallAI } from '@/apis/Patient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const id = uuidv4();
export default function Input() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const router = useRouter();
  const { patientRequest, patient } = useAppSelector((state) => state.main);
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const CloseModal = () => {
    setPatientModal(false);
  };

  const handleSend = async (data: Patient) => {
    //여기에 AI에게 명령을 보내는 코드를 작성
    const postdata = { ...patientRequest };
    postdata.comments = input;
    //환자가 선택이 안되면 그 채팅 모아두는 곳으로 전송 -> 이게 mainSlice의 initial값으로 사용될듯!
    dispatch(addTempTab({ patient: data, uuid: id }));
    router.replace(`/medical/temp/${id}`);
    await fetchCallAI(postdata);
  };

  const handleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pid}>PID : {patient.pid}</div>
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
        onChange={handleOnchage}
        defaultValue={input}
      />
      <Send
        className={'w-7 text-clip blue-logo ml-auto mr-5 cursor-pointer'}
        onClick={() => handleSend(patient)}
      />
    </div>
  );
}
