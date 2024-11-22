'use client';

import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { Dispatch, SetStateAction, useState } from 'react';
import FilteredPatientDB from './PatientDB/FilteredPatientDB';
import { fetcMedicalAI, fetchCallAI } from '@/apis/Patient';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import {
  setLoading,
  setLoadingTabPathName,
  // setPrevMessageList,
  tab,
} from '@/redux/features/tab/tabSlice';
import { setSelectedTabPathName } from '@/redux/features/request/requestSlice';
import { MessageType } from '../../ChatLayout';

type Props = {
  messagelist: MessageType[];
  setMessagelist: Dispatch<SetStateAction<MessageType[]>>;
  pid: string;
  nowTab: tab;
};

export default function ChatInput({ nowTab, pid, messagelist, setMessagelist }: Props) {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const [isNewDb, setIsNewDb] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const reportData = useAppSelector((state) => state.report.reportData);
  const dispatch = useAppDispatch();
  // const messagelist = nowTab.messageList;

  const CloseModal = () => {
    setPatientModal(false);
  };

  const clickSend = () => {
    if (comment === '') return;

    const userMessage = {
      id: '',
      agent: 'MG',
      comment: comment,
      createDate: '',
      memberId: '',
      question: true,
      reportId: '',
    };

    // dispatch(setPrevMessageList([userMessage]));
    setMessagelist((prev) => [userMessage, ...prev]);
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
    console.log('에이전트 요청', nowTab, messagelist);

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
    const notification = {
      id: '',
      reportId: '',
      agent: 'CXR',
      comment: `Analyzing the data for ID ${nowTab.patient.pid}.`,
      question: false,
      createDate: '',
      memberId: '',
    };

    // dispatch(setPrevMessageList([notification]));
    setMessagelist((prev) => [notification, ...prev]);
    dispatch(setLoadingTabPathName(nowTab.pathname));
    dispatch(setLoading(true));
  };

  const handleMedicalChat = async () => {
    console.log('메디컬챗 요청', nowTab, messagelist);
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
      setMessagelist((prev) => [responseMessage, ...prev]);
      // dispatch(setPrevMessageList([responseMessage]));
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
          if (e.key === 'Enter') clickSend();
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
