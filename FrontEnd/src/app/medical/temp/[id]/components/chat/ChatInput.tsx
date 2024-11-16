'use client';

import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { useState } from 'react';
import PatientDB from '@/components/PatientDB/PatientDB';
import {
  setDispatchMessageList,
  setLoading,
  setLoadingTabPathName,
  setPatientInit,
  tab,
} from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { fetchCallAI, fetcMedicalAI } from '@/apis/Patient';
import { setSelectedTabPathName } from '@/redux/features/request/requestSlice';

export default function ChatInput({ nowTab }: { nowTab: tab }) {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const CloseModal = () => {
    setPatientModal(false);
  };
  const [comment, setComment] = useState<string>('');
  const messageList = nowTab.messageList;

  const handleAgentChat = async () => {
    await fetchCallAI({
      PID: nowTab.patient.pid,
      image: nowTab.patient.image,
      shootingDate: nowTab.patient.visitDate,
      sex: nowTab.patient.sex,
      age: nowTab.patient.age,
      comment: nowTab.isFirst ? nowTab.firstMessage : comment,
      key: nowTab.patientRequest.key,
      agent: nowTab.patient.modality,
    });
  };

  const handleMedicalChat = async () => {
    const response = await fetcMedicalAI({
      comment: nowTab.isFirst ? nowTab.firstMessage : comment,
      isQuestion: true,
      PID: nowTab.patient.pid,
      member_id: '',
      agent: nowTab.patient.modality,
      chat_list: messageList.map((message) => {
        return {
          message: message.comment,
          isQuestion: message.question,
        };
      }),
      summary: '',
    });
    if (response) {
      dispatch(
        setDispatchMessageList([
          {
            id: '',
            reportId: '',
            agent: 'MG',
            comment: response.response,
            question: false,
            createDate: '',
            memberId: '',
          },
        ]),
      );
    }
    dispatch(setLoading(false));
  };

  const handleSend = () => {
    console.log(nowTab.patient.modality);
    if (nowTab.patient.modality === 'MG') {
      dispatch(setLoadingTabPathName(nowTab.pathname));
      handleMedicalChat();
    } else if (nowTab.patient.modality === 'CXR') {
      dispatch(setLoadingTabPathName(nowTab.pathname));
      dispatch(setSelectedTabPathName(nowTab.pathname));
      handleAgentChat();
    } else {
      dispatch(setLoadingTabPathName(nowTab.pathname));
      handleMedicalChat();
    }
  };

  return (
    <div className={`${styles.inputContainer} relative`}>
      <div className={`absolute top-[-25px] ${styles.pid}`}>
        PID :{nowTab.patient.pid !== '' && nowTab.patient.pid}
        {nowTab.patient.pid !== '' && (
          <IoMdCloseCircleOutline
            className={`cursor-pointer`}
            onClick={() => {
              dispatch(setPatientInit());
            }}
          />
        )}
      </div>
      <FaDatabase
        className={styles.dbIcon}
        onClick={() => setPatientModal(true)}
      />

      <input
        className={styles.chatInput}
        placeholder="메시지를 입력하세요..."
        onChange={(e) => {
          setComment(e.target.value);
        }}
        value={comment}
      />
      <Send
        className={styles.sendIcon}
        onClick={() => {
          dispatch(
            setDispatchMessageList([
              {
                id: '',
                reportId: '',
                agent: nowTab.patient.modality!,
                comment: `ID: ${nowTab.patient.pid} ${nowTab.patient.modality}\n${comment}`,
                question: true,
                createDate: '',
                memberId: '',
              },
            ]),
          );
          handleSend();
          setComment('');
        }}
      />

      {isPatientModal && <PatientDB onClose={CloseModal} />}
    </div>
  );
}
