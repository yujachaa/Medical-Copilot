import SideBar from '@/components/SideBar/SideBar';
import SmallTabBoard from '@/components/Tabs/TabBoard/SmallTabBoard';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <SideBar />
        <div className="flex flex-col">
          <SmallTabBoard />
          {children}
        </div>
      </div>
    </>
  );
}
