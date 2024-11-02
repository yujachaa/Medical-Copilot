import React from 'react';
import { HiPaperClip } from 'react-icons/hi2';
import styles from './Input.module.scss';
import Send from '@/assets/images/send.svg';

export default function Input() {
  return (
    <div className={styles.container}>
      <div className={styles.file}>
        <HiPaperClip className="rotate-135 w-6 h-6 text-clip" />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter your search query"
      />
      <Send className={'w-7 text-clip blue-logo ml-auto mr-5'} />
    </div>
  );
}
