import React from 'react';
import styles from './Tab.module.scss';
import Logo from '../../assets/images/logo.svg';
import { CgClose } from 'react-icons/cg';
export default function Tab() {
  return (
    <div className={styles.tab}>
      <Logo className="w-8 h-8 ml-4" />
      <p>Default Plugin</p>
      <CgClose className="w-5 h-5 ml-auto mr-4 cursor-pointer" />
    </div>
  );
}
