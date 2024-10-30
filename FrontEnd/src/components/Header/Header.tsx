import React from 'react';
import styles from './Header.module.scss';
import Tab from '../Tabs/Tab';

export default function Header() {
  return (
    <div className={styles.header}>
      <Tab />
    </div>
  );
}
