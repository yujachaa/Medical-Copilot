'use client';
import SEEHandler from '@/components/Alarm/SEEHandler';
import { useAppSelector } from '@/redux/store/hooks/store';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { otp } = useAppSelector((state) => state.alarm);
  console.log(otp);
  return (
    <>
      {otp !== '' && <SEEHandler otp={otp} />}
      {children}
    </>
  );
}
