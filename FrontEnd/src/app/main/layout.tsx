import SSEHandler from '@/components/Alarm/SSEHandler';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SSEHandler />
      {children}
    </>
  );
}
