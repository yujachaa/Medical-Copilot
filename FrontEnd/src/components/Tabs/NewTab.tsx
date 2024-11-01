import React from 'react';
import styles from './NewTab.module.scss';
import { CgMathPlus } from 'react-icons/cg';

type NewTabProps = {
  onPlus?: () => void;
};
export default function NewTab({ onPlus }: NewTabProps) {
  return (
    <div className={` ${styles.tab}`}>
      <CgMathPlus
        className="w-5 h-5 cursor-pointer text-rgb0.5"
        onClick={onPlus}
      />
    </div>
  );
}
