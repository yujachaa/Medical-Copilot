'use client';
import React from 'react';
import styles from './TabBoard.module.scss';
import Tab from './Tab';
import NewTab from './NewTab';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTab, deleteTab, setSelectedTab } from '@/redux/features/tab/tabSlice';
export default function TabBoard() {
  const { selectedIndex, tablist } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteTab(id));
  };

  return (
    <div className={styles.container}>
      {tablist.map((tab, index) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={index === selectedIndex ? true : false}
          onClick={() => dispatch(setSelectedTab(tab.id))}
          HandleDelete={handleDelete}
        />
      ))}
      <NewTab onPlus={() => dispatch(addTab())} />
    </div>
  );
}
