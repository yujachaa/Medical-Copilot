import React, { useEffect, useState } from 'react';
import styles from './AlarmModal.module.scss';
import Item from '@/components/Alarm/components/Item';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { fetchAllAlarm, readAllAlarm } from '@/apis/alarm';

// 알람 데이터 타입 정의
type Alarm = {
  id: number;
  reportId: string | null;
  memberId: string;
  patientId: string;
  modality: string;
  createdDate: string;
};

type Props = {
  onClose?: () => void;
};

export default function AlarmModal({ onClose }: Props) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  useEffect(() => {
    // fetchAllAlarm 함수 호출 및 데이터 저장
    const fetchData = async () => {
      const data = await fetchAllAlarm();
      if (data) {
        // 최신 알람 순서로 정렬
        const sortedData = data.sort(
          (a: Alarm, b: Alarm) =>
            new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime(),
        );
        setAlarms(sortedData);
      }
    };
    fetchData();
  }, []);

  const clickReadAll = async () => {
    if (alarms.length === 0) return;
    const data = await readAllAlarm();
    if (data) {
      console.log('알람 모두 읽기', data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.title}>알림</div>

          <div
            className={styles.readbtn}
            onClick={clickReadAll}
          >
            모두 읽음
          </div>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className={`${styles.close} cursor-pointer ml-auto`}
          />
        </div>
        {alarms.length > 0 ? (
          <div className={styles.item_box}>
            {alarms.map((alarm) => (
              <Item
                key={alarm.id}
                alarmId={alarm.id}
                alarmData={alarm}
              />
            ))}
          </div>
        ) : (
          <div>There are no notifications.</div>
        )}
      </div>
    </div>
  );
}
