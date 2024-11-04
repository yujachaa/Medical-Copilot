'use client';
import React from 'react';
import styles from './page.module.scss';
import ReadButton from './components/ReadButton';
import Item from './components/Item';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { initialIndex } from '@/redux/features/tab/tabSlice';
export default function Page() {
  const dispatch = useAppDispatch();
  dispatch(initialIndex());

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>Notifications</div>
        <ReadButton />
      </div>

      <div className={styles.item_box}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item className="read" />
      </div>
    </div>
  );
}
