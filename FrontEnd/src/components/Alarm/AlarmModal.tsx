import React, { useEffect, useState } from 'react';
import styles from './AlarmModal.module.scss';
import Item from '@/components/Alarm/components/Item';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { fetchAllAlarm, readAlarm, readAllAlarm } from '@/apis/alarm';

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
  onClose: () => void;
};

export default function AlarmModal({ onClose }: Props) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

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
        setIsFetched(true);
        console.log('알람목록', sortedData);
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

  const handleDelete = async (e: React.MouseEvent<SVGElement>, id: number) => {
    e.stopPropagation();
    readAlarm(id);
    setAlarms((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.top}>
          <div className={styles.title}>Notifications</div>

          <div
            className={styles.readbtn}
            onClick={clickReadAll}
          >
            Read All
          </div>
          <IoMdCloseCircleOutline
            onClick={onClose}
            className={`${styles.close} cursor-pointer ml-auto`}
          />
        </div>
        {
          isFetched ? (
            alarms.length > 0 ? (
              <div className={styles.item_box}>
                {alarms.map((alarm) => (
                  <Item
                    key={alarm.id}
                    alarmId={alarm.id}
                    alarmData={alarm}
                    onClose={onClose}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div>There are no notifications.</div>
            )
          ) : null
          // (예정) 여기에 스피너 추가
        }
      </div>
    </div>
  );
}
