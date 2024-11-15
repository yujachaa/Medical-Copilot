'use client';
import React, { useEffect } from 'react';
import styles from './SmallTabBoard.module.scss';
import Tab from '../Tab';
import NewTab from '../NewTab';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import { addTab, deleteTab, setSelectedTab } from '@/redux/features/tab/tabSlice';

export default function TabBoard() {
  const { selectedIndex, tablist } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    // 상태가 업데이트되었을 때 router.push 호출
    if (selectedIndex !== -1 && tablist[selectedIndex]) {
      router.push(tablist[selectedIndex].pathname);
    }
  }, [selectedIndex, tablist, router]);

  const handleDelete = (id: number) => {
    dispatch(deleteTab(id));
  };

  const handleCreateTab = () => {
    dispatch(addTab());
  };

  const hadnleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(setSelectedTab(id));
  };
  return (
    <div className={styles.container}>
      {tablist.map((tab, index) => (
        <Tab
          key={tab.id}
          tab={tab}
          isActive={index === selectedIndex ? true : false}
          HandleDelete={handleDelete}
          onClick={(e) => hadnleClick(e, tab.id)}
        />
      ))}
      <NewTab onPlus={handleCreateTab} />
    </div>
  );
}
