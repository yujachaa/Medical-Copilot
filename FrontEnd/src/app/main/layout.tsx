import SideBar from '@/components/SideBar/SideBar';
import TabBoard from '@/components/Tabs/TabBoard';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <SideBar />
        <div>
          <TabBoard />
          {children}
        </div>
      </div>
    </>
  );
}
