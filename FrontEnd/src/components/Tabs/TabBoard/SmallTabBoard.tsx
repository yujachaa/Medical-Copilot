'use client';
import React from 'react';
import styles from './SmallTabBoard.module.scss';
import Tab from '../Tab';
import NewTab from '../NewTab';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTab, deleteTab, setSelectedTab } from '@/redux/features/tab/tabSlice';
import { useRouter } from 'next/navigation';

export default function TabBoard() {
  const { selectedIndex, tablist, increment } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDelete = (id: number) => {
    dispatch(deleteTab(id));
  };

  const handleCreateTab = () => {
    dispatch(addTab());
    router.push(`/main/${increment + 1}`);
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
      <NewTab onPlus={handleCreateTab} />
    </div>
  );
}
