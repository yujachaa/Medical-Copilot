'use client';
import React, { useMemo, useState } from 'react';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import dynamic from 'next/dynamic';
const PatientDB = dynamic(() => import('@/components/PatientDB/PatientDB'), { ssr: false });
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTempTab, Patient } from '@/redux/features/tab/tabSlice';
import { fetchCallAI } from '@/apis/Patient';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { PatientReqeust } from '@/redux/features/tab/tabSlice';
import { jwtDecode } from 'jwt-decode';
const id = uuidv4();
export default function Input() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const router = useRouter();
  const { tablist, selectedIndex } = useAppSelector((state) => state.tab);
  const { accessToken } = useAppSelector((state) => state.user);
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const CloseModal = () => {
    setPatientModal(false);
  };

  interface DecodedToken {
    sub: string;
    id: string;
    email: string;
    role: string;
    exp: number;
    iat: number;
  }
  const pid = useMemo(() => {
    // memeberId가 맞는데 fetch를 같이 쓰고 있어서 pid로 했어요.
    const decodedToken = jwtDecode<DecodedToken>(accessToken);
    return decodedToken.id;
  }, [accessToken]);

  const handleSend = async (data: Patient) => {
    //환자를 선택하지 않았을때
    if (tablist[selectedIndex].patient.pid === '') {
      dispatch(
        addTempTab({
          patient: data,
          uuid: id + `?comment=${input}&question=true&memberId=${pid}`,
          firstMessage: input,
        }),
      );
      router.replace(`/medical/temp/${id}?comment=${input}&question=true&memberId=${pid}`);
    }
    //환자를 선택했을때
    else {
      const postdata: PatientReqeust = { ...tablist[selectedIndex].patientRequest! };
      postdata.comments = input;
      //환자가 선택이 안되면 그 채팅 모아두는 곳으로 전송 -> 이게 mainSlice의 initial값으로 사용될듯!
      dispatch(addTempTab({ patient: data, uuid: id, firstMessage: input }));
      router.replace(`/medical/temp/${id}`);
      await fetchCallAI(postdata);
    }
  };

  const handleOnchage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pid}>
        PID : {tablist[selectedIndex].patient !== null && tablist[selectedIndex].patient!.pid}
      </div>
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
        onClick={() => handleSend(tablist[selectedIndex].patient!)}
      />
    </div>
  );
}
