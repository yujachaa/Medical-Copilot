import Link from 'next/link';
import styles from './ClientListItem.module.scss';
import { FaChevronRight } from 'react-icons/fa';

type dataType = { id: number; clientName: string; usageAi: number; week: number; state: string };

export default function ClientListItem({ client }: { client: dataType }) {
  return (
    <Link
      className={`${styles.main} w-full h-[110px] rounded-[10px] flex pl-4 pt-3 pr-2 pb-3`}
      href={`/main/${client.id}`}
    >
      <div className={`w-[95%] h-full flex flex-col`}>
        <span className={`${styles.clientId}`}>
          No.<span className={`${styles.clientIdNumber}`}>{client.id}</span>
        </span>
        <span className={`${styles.clientName}`}>{client.clientName}</span>
        <div className={`${styles.tag} flex gap-6 h-[35px] justify-between`}>
          <span className={`${styles.usage}`}>{client.usageAi}</span>
          <span className={`${styles.week}`}>{client.week}weeks</span>
          <span
            style={
              client.state !== 'Error'
                ? { backgroundColor: '#1F9DFF' }
                : { backgroundColor: '#FF8090' }
            }
            className={`${styles.state}`}
          >
            {client.state}
          </span>
        </div>
      </div>
      <div className={`w-[5%] h-[100%] flex justify-center items-center`}>
        <FaChevronRight />
      </div>
    </Link>
  );
}
