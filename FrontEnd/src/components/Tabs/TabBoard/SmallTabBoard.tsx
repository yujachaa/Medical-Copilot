'use client';
import React from 'react';
import styles from './SmallTabBoard.module.scss';
import Tab from '../Tab';
import NewTab from '../NewTab';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTab, deleteTab, setSelectedTab } from '@/redux/features/tab/tabSlice';

export default function TabBoard() {
  const { selectedIndex, tablist } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const handleDelete = (id: number) => {
    dispatch(deleteTab(id));
  };

  const handleCreateTab = () => {
    dispatch(addTab());
  };

  const hadnleClick = (id: number) => {
    dispatch(setSelectedTab(id));
    //탭으로 이동할때 chat방이면 pid를 통해 fetch를 한번 더
  };
  return (
    <div className={styles.container}>
      {tablist.map((tab, index) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={index === selectedIndex ? true : false}
          onClick={() => hadnleClick(tab.id)}
          HandleDelete={handleDelete}
        />
      ))}
      <NewTab onPlus={handleCreateTab} />
    </div>
  );
}
