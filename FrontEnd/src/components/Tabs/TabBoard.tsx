import React from 'react';
import styles from './TabBoard.module.scss';
import Tab from './Tab';
export default function TabBoard() {
  return (
    <div className={styles.tab}>
      <Tab />
    </div>
  );
}
