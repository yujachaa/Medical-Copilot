'use client';
import { BaseURL } from '@/apis/core';
import { useAppSelector } from '@/redux/store/hooks/store';
import React, { useEffect } from 'react';

type Props = {
  otp: string;
};

export default function SEEHandler({ otp }: Props) {
  console.log(otp);
  const { accessToken } = useAppSelector((state) => state.user);
  console.log(accessToken);

  useEffect(() => {
    console.log('SSE 동작');
    const EventSourcePolyfill = (window as any).EventSourcePolyfill || EventSource;
    const eventSource = new EventSourcePolyfill(`${BaseURL}notification/emitter`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSource.onopen = () => {
      console.log('EventSource connection opened successfully.');
    };

    eventSource.onmessage = (event: MessageEvent) => {
      console.log(event);
      console.log(event.data);
    };

    eventSource.onerror = (error: unknown) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // 컴포넌트가 언마운트될 때 이벤트 소스 닫기
    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  return <></>;
}
