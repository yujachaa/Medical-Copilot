'use client';

import { IoMdCloseCircleOutline } from 'react-icons/io';
import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import PatientDB from '@/components/PatientDB/PatientDB';
import { setDispatchMessageList, setPatientInit, tab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { fetchCallAI, fetcMedicalAI } from '@/apis/Patient';
import { setSelectedTabPathName } from '@/redux/features/request/requestSlice';

export default function ChatInput({
  nowTab,
  setLoading,
}: {
  nowTab: tab;
  setLoading: Dispatch<SetStateAction<number>>;
}) {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const CloseModal = () => {
    setPatientModal(false);
  };
  const [comment, setComment] = useState<string>('');
  const messageList = nowTab.messageList;

  const handleAgentChat = async () => {
    setLoading(1);
    const response = await fetchCallAI({
      PID: nowTab.patient.pid,
      image: nowTab.patient.image,
      shootingDate: '',
      sex: nowTab.patient.sex,
      age: nowTab.patient.age,
      comments: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
      key: nowTab.patientRequest.key,
      agent: nowTab.patient.modality,
    });
    console.log(response);
    setLoading(2);
  };

  const handleMedicalChat = async () => {
    setLoading(1);
    const response = await fetcMedicalAI({
      comment: nowTab.isFirst ? nowTab.firstMessage : '입력한값',
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
      setLoading(2);
    }
  };

  const handleSend = () => {
    if (nowTab.patient.modality === 'MG') {
      handleMedicalChat();
    } else if (nowTab.patient.modality === 'CXR') {
      dispatch(setSelectedTabPathName(nowTab.pathname));
      handleAgentChat();
    } else {
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
      />
      <Send
        className={styles.sendIcon}
        onClick={() => {
          dispatch(
            setDispatchMessageList([
              {
                id: '',
                reportId: '',
                agent: 'MG',
                comment: comment,
                question: true,
                createDate: '',
                memberId: '',
              },
            ]),
          );
          handleSend();
        }}
      />

      {isPatientModal && <PatientDB onClose={CloseModal} />}
    </div>
  );
}
