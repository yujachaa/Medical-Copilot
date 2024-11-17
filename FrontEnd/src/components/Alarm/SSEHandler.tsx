'use client';
import { BaseURL } from '@/apis/core';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks/store';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Popup from './components/Popup';
import { setReportId } from '@/redux/features/request/requestSlice';
import {
  addAgentMessage,
  addPrevAgentMessage,
  setLoading,
  setPatientModality,
} from '@/redux/features/tab/tabSlice';

export type Token = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  role: string;
  sub: string;
};

export type Noti = {
  id: number;
  reportId: string;
  memberId: string;
  patientId: string;
  modality: string;
  createdDate: string;
};
export default function SSEHandler() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.user);
  const eventSourceRef = useRef<EventSource | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); //팝업 확인용 하드코딩
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [alarmData, setAlarm] = useState<Noti>({
    id: -1,
    reportId: '',
    memberId: '',
    patientId: '',
    modality: '',
    createdDate: '',
  });
  const tabList = useAppSelector((state) => state.tab.tablist);
  const tabPathName = useAppSelector((state) => state.request.selectedTabPathName);
  const alarmTabIdx = useMemo(() => {
    return tabList.findIndex((tab) => tab.pathname === tabPathName);
  }, [tabList, tabPathName]);

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    const decode: Token = jwtDecode(accessToken);
    const connectSSE = () => {
      const EventSourcePolyfill = (window as any).EventSourcePolyfill || EventSource;
      eventSourceRef.current = new EventSourcePolyfill(
        `${BaseURL}notification/emitter/${decode.id}`,
        {
          headers: {
            'Content-Type': 'text/event-stream',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      eventSourceRef.current!.onopen = () => {
        console.log('EventSource connection opened successfully.');
      };

      eventSourceRef.current!.onmessage = (event: MessageEvent) => {
        const data: Noti = JSON.parse(event.data);
        setAlarm(data);

        const message = {
          id: '',
          agent: 'CXR',
          comment: 'Analysis completed. Click on the chat to view the results.',
          createDate: '',
          memberId: '',
          question: false,
          reportId: data.reportId,
        };
        dispatch(setLoading(false));

        //알림받을 탭이 환자챗인 경우
        if (tabPathName.includes('chat')) {
          dispatch(addPrevAgentMessage({ alarmTabIdx, message }));
        } else if (alarmTabIdx !== -1) {
          dispatch(addAgentMessage({ alarmTabIdx, message }));
        }
        dispatch(setReportId(data.reportId!));
        dispatch(setPatientModality('MG'));
        //여기서 알람 팝업 열기
        setIsPopupOpen(true); // 알람 팝업 열기
        setIsClosing(false); // 팝업 열릴 때는 닫힘 상태 false
      };

      eventSourceRef.current!.onerror = (error: unknown) => {
        console.error('EventSource failed:', error);
        eventSourceRef.current!.close();
        setTimeout(() => {
          if (accessToken !== '') connectSSE();
        }, 5000);
      };
    };

    if (accessToken !== '') {
      connectSSE();
    }

    // 컴포넌트가 언마운트될 때 이벤트 소스 닫기
    return () => {
      eventSourceRef.current!.close();
    };
  }, [accessToken, tabPathName]);

  return (
    <>
      {isPopupOpen && (
        <Popup
          data={alarmData}
          onClose={closePopup}
          isClosing={isClosing}
        />
      )}
    </>
  );
}
