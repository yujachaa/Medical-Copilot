'use client';

import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { useState } from 'react';
import FilteredPatientDB from './PatientDB/FilteredPatientDB';

export default function ChatInput() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);
  const [isNewDb, setIsNewDb] = useState<boolean>(false);

  const CloseModal = () => {
    setPatientModal(false);
  };

  const clickSend = () => {
    if (isNewDb) {
      //새 db 선택한경우 -> 에이전트 요청
    } else {
      //후속질문
    }
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
