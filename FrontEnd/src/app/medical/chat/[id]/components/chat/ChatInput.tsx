'use client';

import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { useState } from 'react';
import FilteredPatientDB from './PatientDB/FilteredPatientDB';
import { fetcMedicalAI, fetchCallAI } from '@/apis/Patient';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import {
  setLoading,
  setLoadingTabPathName,
  setPrevMessageList,
  tab,
} from '@/redux/features/tab/tabSlice';
import { setSelectedTabPathName } from '@/redux/features/request/requestSlice';

type Props = {
  // messagelist: MessageType[];
  // setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  pid: string;
  nowTab: tab;
};

export default function ChatInput({ nowTab, pid }: Props) {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const [isNewDb, setIsNewDb] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const reportData = useAppSelector((state) => state.report.reportData);
  const dispatch = useAppDispatch();
  const messagelist = nowTab.messageList;

  const CloseModal = () => {
    setPatientModal(false);
  };

  const clickSend = () => {
    const userMessage = {
      id: '',
      agent: 'MG',
      comment: comment,
      createDate: '',
      memberId: '',
      question: true,
      reportId: '',
    };

    dispatch(setPrevMessageList([userMessage]));
    // setMessagelist((prev) => [userMessage, ...prev]);
    if (isNewDb) {
      //새 db 선택한경우 -> 에이전트 요청 후 false로 바꾸기
      if (nowTab.patient.modality === 'MG') {
        handleMedicalChat();
      } else {
        handleAgentChat();
        dispatch(setSelectedTabPathName(nowTab.pathname));
      }
      setIsNewDb(false);
    } else {
      //후속질문
      handleMedicalChat();
    }
    dispatch(setLoadingTabPathName(nowTab.pathname));
  };

  const handleAgentChat = async () => {
    await fetchCallAI({
      PID: nowTab.patient.pid,
      image: nowTab.patient.image,
      shootingDate: nowTab.patient.visitDate,
      sex: nowTab.patient.sex,
      age: nowTab.patient.age,
      comment: comment,
      key: nowTab.patientRequest.key,
      agent: nowTab.patient.modality,
    });
    const notification =
      // {
      //   id: '',
      //   reportId: '',
      //   agent: 'CXR',
      //   comment: `ID: ${nowTab.patient.pid} CXR\n${comment}`,
      //   question: true,
      //   createDate: '',
      //   memberId: '',
      // },
      {
        id: '',
        reportId: '',
        agent: 'CXR',
        comment: `Analyzing the data for ID ${nowTab.patient.pid}.`,
        question: false,
        createDate: '',
        memberId: '',
      };

    dispatch(setPrevMessageList([notification]));
    dispatch(setLoadingTabPathName(nowTab.pathname));
    // setMessagelist((prev) => [notification, ...prev]);
  };

  const handleMedicalChat = async () => {
    const response = await fetcMedicalAI({
      comment: comment,
      isQuestion: true,
      PID: nowTab.patient.pid,
      member_id: '',
      agent: nowTab.patient.modality,
      chat_list: messagelist.map((message) => {
        return {
          message: message.comment,
          isQuestion: message.question,
        };
      }),
      summary: reportData ? (reportData.pid === pid ? reportData.summary : '') : '',
    });
    if (response) {
      const responseMessage = {
        id: '',
        reportId: '',
        agent: 'MG',
        comment: response.response,
        question: false,
        createDate: '',
        memberId: '',
      };
      dispatch(setPrevMessageList([responseMessage]));
    }
    dispatch(setLoading(false));
  };

  return (
    <div className={styles.inputContainer}>
      <FaDatabase
        className={styles.dbIcon}
        onClick={() => setPatientModal(true)}
      />

      <input
        className={styles.chatInput}
        placeholder="Enter a message"
        onKeyDown={(e) => {
          if (e.key === 'enter') clickSend();
        }}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Send
        className={styles.sendIcon}
        onClick={clickSend}
      />

      {isPatientModal && (
        <FilteredPatientDB
          onClose={CloseModal}
          newDbFlag={setIsNewDb}
        />
      )}
    </div>
  );
}
