'use client';

import styles from './ChatInput.module.scss';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import Send from '@/assets/images/send.svg';
import { useState } from 'react';
import PatientDB from '@/components/PatientDB/PatientDB';

export default function ChatInput() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);

  const CloseModal = () => {
    setPatientModal(false);
  };

  return (
    <div className={styles.inputContainer}>
      <FaDatabase
        className={styles.dbIcon}
        onClick={() => setPatientModal(true)}
      />

      <input
        className={styles.chatInput}
        placeholder="메시지를 입력하세요..."
      />
      <Send className={styles.sendIcon} />

      {isPatientModal && <PatientDB onClose={CloseModal} />}
    </div>
  );
}
