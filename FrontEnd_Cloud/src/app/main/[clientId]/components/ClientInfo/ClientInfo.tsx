import { clientDetail } from '@/types/client';
import styles from './ClientInfo.module.scss';

export default function ClientInfo({ data }: { data: clientDetail }) {
  return (
    <div className={`${styles.main} flex flex-col h-[35%] min-h-[220px] max-h-[260px] pt-4`}>
      <div className={`${styles.title} flex gap-6 items-end`}>
        <span className={`${styles.name}`}>{data.comName}</span>
        <span className={`${styles.tokens} mr-10`}>{checkGrade(data.grade)} tokens/week</span>
        <div className={`${styles.titleBtns} flex gap-6`}>
          <span className={`${styles.edit} flex justify-center items-center`}>EDIT</span>
          <span className={`${styles.stop} flex justify-center items-center`}>STOP</span>
        </div>
      </div>
      <span className={`${styles.key} pl-1 mt-2`}>Serial key : {data.key}</span>
      <p className={`${styles.usage} mt-3 pl-1`}>
        Week Usage <span className={`${styles.medGuruCount}`}></span>/50
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
