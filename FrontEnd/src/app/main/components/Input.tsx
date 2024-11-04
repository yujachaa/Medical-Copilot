import React from 'react';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';
import { FaDatabase } from 'react-icons/fa6';
export default function Input() {
  return (
    <div className={styles.container}>
      <label
        htmlFor="file"
        className={styles.file}
      >
        <FaDatabase className="w-5 h-5 text-clip" />
      </label>
      <input
        id="file"
        type="file"
        className="hidden w-0 h-0"
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your search query"
      />
      <Send className={'w-7 text-clip blue-logo ml-auto mr-5'} />
    </div>
  );
}
