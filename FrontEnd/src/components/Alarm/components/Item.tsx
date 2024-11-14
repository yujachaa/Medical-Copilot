'use client';
import React from 'react';
import styles from './Item.module.scss';
import { CgClose } from 'react-icons/cg';
import { readAlarm } from '@/apis/alarm';

// 알람 데이터 타입 정의
type Alarm = {
  id: number;
  reportId: string | null;
  memberId: string;
  patientId: string;
  modality: string;
  createdDate: string;
};

type ItemProps = {
  className?: string;
  alarmId: number;
  alarmData: Alarm;
};
export default function Item({ className, alarmId, alarmData }: ItemProps) {
  const clickAlarm = async () => {
    console.log('알람클릭', alarmId, alarmData.reportId);
    //알람 읽기 api 호출
    const data = await readAlarm(alarmId);
    if (data) {
      console.log('알람읽기 완료', data);
    }
    //(예정)클릭한 알람과 연결된 리포트 페이지로 이동하는 부분 넣기!!
  };

  //날짜 포맷팅 함수
  function formatCreatedDate(createdDate: string): string {
    const date = new Date(createdDate);
    const today = new Date();

    // 오늘 날짜인지 확인
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      // 오늘 날짜인 경우 오전 hh:mm 형식
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${ampm} ${formattedHours}:${formattedMinutes}`;
    } else {
      // 다른 날짜인 경우 yy/mm/dd 형식
      const year = String(date.getFullYear()).slice(2); // 년도 두 자리
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 두 자리
      const day = String(date.getDate()).padStart(2, '0'); // 일 두 자리
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
      <CgClose className={`${styles.close}`} />
    </div>
  );
}
