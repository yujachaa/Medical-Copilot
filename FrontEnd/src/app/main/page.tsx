'use client';

import React from 'react';
import Main from './components/Default/MainLayout';
import { useAppSelector } from '@/redux/store/hooks/store';
import ChatLayout from './components/Diagnosis/ChatLayout';
import SideBar from '@/components/SideBar/SideBar';
import TabBoard from '@/components/Tabs/TabBoard/SmallTabBoard';
// import SideBar from '@/components/SideBar/SideBar';

export default function Page() {
  const { selectedIndex, tablist } = useAppSelector((state) => state.tab);
  return (
    <>
      {tablist[selectedIndex].tabType === 'default' && (
        <div className="w-screen flex flex-row">
          <SideBar />
          <div className="flex flex-col">
            <TabBoard />
            <Main />
          </div>
        </div>
      )}
      {tablist[selectedIndex].tabType === 'chat' && <ChatLayout />}
    </>
  );
}
