'use client';
import React from 'react';
import styles from './Item.module.scss';
import { CgClose } from 'react-icons/cg';

type ItemProps = {
  className?: string;
};
export default function Item({ className }: ItemProps) {
  const handleDelete = () => {
    console.log('Delete clicked');
  };
  return (
    <div className={styles.container}>
      <div className="flex flex-col">
        <div className={`${styles.alarm} ${className ? styles[className] : ''}`}>New</div>
        <div>Here`s notification message for CXR diagnosis arrival about Patient`s Id</div>
      </div>
      <CgClose
        className={`${styles.close} cursor-pointer`}
        onClick={handleDelete}
      />
    </div>
  );
}
