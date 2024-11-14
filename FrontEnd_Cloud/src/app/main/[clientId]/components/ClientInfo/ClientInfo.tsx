import { clientDetail } from '@/types/client';
import styles from './ClientInfo.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { fetchLimit } from '@/apis/fetchLimit';
import { useAppDispatch } from '@/redux/store/hooks/store';
import { setClientModifyModal, setWarningModal } from '@/redux/features/modal/modalSlice';
import { fetchClientWeekUsage } from '@/apis/fetchClientWeekUsage';

export default function ClientInfo({ data }: { data: clientDetail }) {
  const dispatch = useAppDispatch();
  const [usage, setUsage] = useState<number>(0);
  useEffect(() => {
    async function getUsage() {
      const fetchedUsage = await fetchClientWeekUsage(data);
      if (fetchedUsage) {
        setUsage(fetchedUsage); // fetchedUsage의 형태에 따라 적절히 값 처리
      }
    }
    getUsage();
  }, [data]);
  const handleLimit = useCallback(async () => {
    const data1 = await fetchLimit(data.key);
    if (data1 && data1.msg === 'success') {
      window.location.reload();
    }
  }, [data.key]);

  return (
    <div className={`${styles.main} flex flex-col h-[35%] min-h-[220px] max-h-[260px] pt-4`}>
      <div className={`${styles.title} flex gap-6 items-end`}>
        <span className={`${styles.name}`}>{data.comName}</span>
        <span className={`${styles.tokens} mr-10`}>{checkGrade(data.grade)} tokens/week</span>
        <div className={`${styles.titleBtns} flex gap-6`}>
          <span
            className={`${styles.edit} flex justify-center items-center cursor-pointer`}
            onClick={() => {
              dispatch(setClientModifyModal());
            }}
          >
            Edit
          </span>
          <span
            className={`${data.availability ? styles.stopColor : styles.startColor} flex justify-center items-center cursor-pointer`}
            onClick={() => {
              if (data.availability) {
                dispatch(setWarningModal());
              } else {
                handleLimit();
              }
            }}
          >
            {data.availability ? 'Stop' : 'Start'}
          </span>
        </div>
      </div>
      <span className={`${styles.key} ${!data.availability && styles.textThrough} pl-1 mt-2`}>
        Serial key : {data.key}
      </span>
      <p className={`${styles.usage} mt-3 pl-1`}>
        Week Usage <span className={`${styles.medGuruCount}`}>{usage}</span>/
        {checkGrade(data.grade)}
      </p>
    </div>
  );
}

const checkGrade = (grade: string) => {
  if (grade === 'DEFAULT') return 50;
  if (grade === 'SILVER') return 100;
  if (grade === 'GOLD') return 200;
  if (grade === 'PLATINUM') return 500;
};
