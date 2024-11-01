import { client } from '@/types/client';
import styles from './ClientInfo.module.scss';

export default function ClientInfo({ data }: { data: client }) {
  return (
    <div className={`${styles.main} flex flex-col h-[35%] min-h-[220px] max-h-[260px] pt-4`}>
      <div className={`flex gap-6 items-end`}>
        <span className={`${styles.name}`}>{data.comName}</span>
        <span className={`${styles.tokens} mr-10`}>50 tokens/week</span>
        <span className={`${styles.edit} flex justify-center items-center`}>EDIT</span>
        <span className={`${styles.stop} flex justify-center items-center`}>STOP</span>
      </div>
      <span className={`${styles.key} pl-1 mt-2`}>Serial key : {data.key}</span>
      <p className={`${styles.usage} mt-3 pl-1`}>
        Week Usage <span className={`${styles.medGuruCount}`}>{data.medGuruCount}</span>/50
      </p>
    </div>
  );
}
