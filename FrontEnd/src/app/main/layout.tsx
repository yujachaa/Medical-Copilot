import TabBoard from '@/components/Tabs/TabBoard/TabBoard';
import React from 'react';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-row">
        <div>
          <TabBoard />
          {children}
        </div>
      </div>
    </>
  );
}
