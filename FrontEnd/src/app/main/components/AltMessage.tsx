import React from 'react';
import styles from './AltMessage.module.scss';
type AltMessage = {
  children: React.ReactNode;
};

export default function AltMessage({ children }: AltMessage) {
  return <div className={styles.message}>{children}</div>;
}
