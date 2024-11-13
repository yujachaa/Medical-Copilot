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
  return (
    <div
      className={styles.container}
      onClick={clickAlarm}
    >
      <div className="flex flex-col">
        <div className={`${styles.alarm} ${className ? styles[className] : ''}`}>New</div>
        <div>
          The {alarmData.modality} diagnosis for Patient ID {alarmData.patientId} has been
          completed.
        </div>
      </div>
      <CgClose className={`${styles.close}`} />
    </div>
  );
}
