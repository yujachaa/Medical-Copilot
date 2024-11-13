import SideBar from '@/components/SideBar/SideBar';
import TabBoard from '@/components/Tabs/TabBoard/SmallTabBoard';
import { ReactNode } from 'react';

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex w-screen h-screen overflow-y-hidden`}>
      <SideBar />
      <div className={`flex flex-col w-full h-full overflow-y-hidden`}>
        <TabBoard />
        {children}
      </div>
    </div>
  );
}
