'use client';
import { setSelectedTab } from '@/redux/features/tab/tabSlice';
import { useAppDispatch } from '@/redux/store/hooks/store';
import React from 'react';
type paramsType = {
  params: {
    id: string;
  };
  children: React.ReactNode;
};
export default function Layout({ params, children }: paramsType) {
  const dispatch = useAppDispatch();
  dispatch(setSelectedTab(Number(params.id)));

  return <>{children}</>;
}
