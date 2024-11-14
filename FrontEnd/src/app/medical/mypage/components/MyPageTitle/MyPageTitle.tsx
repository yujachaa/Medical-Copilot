import { useEffect, useState } from 'react';
import RemainBar from '../RemainBar/RemainBar';
import styles from './MyPageTitle.module.scss';
import { fetchQuota } from '@/apis/user';

export default function MyPageTitle() {
  const [quota, setQuota] = useState<number>(0);

  useEffect(() => {
    const getQuota = async () => {
      const data = await fetchQuota();
      setQuota(data.weeklyCount);
    };
    getQuota();
  }, []);

  return (
    <div className={`${styles.main} flex justify-center`}>
      <div className={`flex gap-6`}>
        <span className={`${styles.mypage}`}>MyPage</span>
        <div className={`flex flex-col justify-end`}>
          <div className={`${styles.remaintext} flex justify-between items-end w-[270px]`}>
            <span>Remaining Usage</span>
            <span className={`text-[20px]`}>{quota} / 50</span>
          </div>
          <RemainBar data={(quota * 100) / 50} />
        </div>
      </div>
    </div>
  );
}
