import SEEHandler from '@/components/Alarm/SEEHandler';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEEHandler />
      {children}
    </>
  );
}
