'use client';

import SSEHandler from '@/components/Alarm/SSEHandler';
import SideBar from '@/components/SideBar/SideBar';
import TabBoard from '@/components/Tabs/TabBoard/SmallTabBoard';
import { useAppSelector } from '@/redux/store/hooks/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

//여기에 사이드바랑, 탭이 와야함
export default function Layout({ children }: { children: React.ReactNode }) {
  const { selectedIndex, tablist } = useAppSelector((state) => state.tab);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/medical') {
      router.replace(tablist[selectedIndex].pathname);
    }
  }, [pathname, router, tablist, selectedIndex]);
  return (
    <div className="w-screen flex flex-row">
      <SSEHandler />
      <SideBar />
      <div className="flex flex-col">
        <TabBoard />
        {children}
      </div>
    </div>
  );
}
