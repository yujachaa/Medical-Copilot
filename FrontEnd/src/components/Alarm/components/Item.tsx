'use client';
import React from 'react';
import styles from './Item.module.scss';
import { CgClose } from 'react-icons/cg';
import { readAlarm } from '@/apis/alarm';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setAlarmTab } from '@/redux/features/tab/tabSlice';

// 알람 데이터 타입 정의
type Alarm = {
  id: number;
  reportId: string;
  memberId: string;
  patientId: string;
  modality: string;
  createdDate: string;
};

type ItemProps = {
  className?: string;
  alarmId: number;
  alarmData: Alarm;
  onClose: () => void;
  handleDelete: (e: React.MouseEvent<SVGElement>, id: number) => void;
};
export default function Item({ className, alarmId, alarmData, onClose, handleDelete }: ItemProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clickAlarm = async () => {
    onClose();
    //알람 읽기 api 호출
    const data = await readAlarm(alarmId);
    if (data) {
    }
    //클릭한 알람과 연결된 리포트 페이지로 이동
    router.replace(`/medical/chat/${alarmData.patientId}?reportId=${alarmData.reportId}`);
    dispatch(setAlarmTab(alarmData));
    await readAlarm(alarmData.id);
  };

  // 날짜 포맷팅 함수
  function formatCreatedDate(createdDate: string): string {
    const date = new Date(createdDate);

    // KST로 변환
    const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // UTC + 9시간
    const kstToday = new Date();

    // 오늘 날짜인지 확인
    const isToday =
      kstDate.getDate() === kstToday.getDate() &&
      kstDate.getMonth() === kstToday.getMonth() &&
      kstDate.getFullYear() === kstToday.getFullYear();

    if (isToday) {
      // 오늘 날짜인 경우 오전 hh:mm 형식
      const hours = kstDate.getHours();
      const minutes = kstDate.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${ampm} ${formattedHours}:${formattedMinutes}`;
    } else {
      // 다른 날짜인 경우 yy/mm/dd 형식
      const year = String(kstDate.getFullYear()).slice(2); // 년도 두 자리
      const month = String(kstDate.getMonth() + 1).padStart(2, '0'); // 월 두 자리
      const day = String(kstDate.getDate()).padStart(2, '0'); // 일 두 자리
      return `${year}/${month}/${day}`;
    }
  }

  return (
    <div
      className={styles.container}
      onClick={clickAlarm}
    >
      <div className="flex flex-col">
        <div className={`${styles.alarm} ${className ? styles[className] : ''}`}>
          {formatCreatedDate(alarmData.createdDate)}
        </div>
        <div>
          The {alarmData.modality} diagnosis for Patient ID {alarmData.patientId} has been
          completed.
        </div>
      </div>
      <CgClose
        className={`${styles.close}`}
        onClick={(e) => handleDelete(e, alarmData.id)}
      />
    </div>
  );
}
