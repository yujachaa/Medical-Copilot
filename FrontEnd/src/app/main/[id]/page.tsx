'use client';
import React from 'react';
import styles from './page.module.scss';
import Input from '../components/Input';
type paramsType = {
  params: {
    id: string;
  };
};
export default function page({ params }: paramsType) {
  console.log(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.title}>MEDICAL COPILOT</div>
      <div className="flex justify-center items-center text-[20px] text-2c2c2c mt-4">
        Dr. Bell will tell you anything about medical knowledge!
      </div>
      <div className="flex justify-center items-center text-[16px] text-2c2c2c">
        Please type in the questions you`re curious about.
      </div>
      <div className="flex justify-center items-center mt-12">
        <Input />
      </div>
    </div>
  );
}
