import React from 'react';
import styles from './NewTab.module.scss';
import { CgMathPlus } from '@react-icons/all-files/cg/CgMathPlus';

type NewTabProps = {
  onPlus?: () => void;
};
export default function NewTab({ onPlus }: NewTabProps) {
  return (
    <div
      className={` ${styles.tab} cursor-pointer`}
      onClick={onPlus}
    >
      <CgMathPlus className="w-5 h-5 cursor-pointer text-rgb0.5" />
    </div>
  );
}
