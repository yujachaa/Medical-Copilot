'use client';
import React, { useState } from 'react';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';
import { FaDatabase } from 'react-icons/fa6';
import PatientDB from '@/components/PatientDB/PatientDB';
export default function Input() {
  const [isPatientModal, setPatientModal] = useState<boolean>(false);

  const CloseModal = () => {
    setPatientModal(false);
  };
  return (
    <div className={styles.container}>
      <label className={styles.file}>
        <FaDatabase
          className="w-5 h-5 text-clip"
          onClick={() => setPatientModal(true)}
        />
      </label>
      {isPatientModal && <PatientDB onClose={CloseModal} />}
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your search query"
      />
      <Send className={'w-7 text-clip blue-logo ml-auto mr-5'} />
    </div>
  );
}
