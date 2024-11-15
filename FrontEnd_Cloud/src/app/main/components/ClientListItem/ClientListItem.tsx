import Link from 'next/link';
import styles from './ClientListItem.module.scss';
import { FaChevronRight } from 'react-icons/fa';
import { client } from '@/types/client';

export default function ClientListItem({ client }: { client: client }) {
  console.log('클라이언트', client);
  return (
    <Link
      className={`${styles.main} w-full h-[110px] rounded-[10px] flex pl-4 pt-3 pr-2 pb-3`}
      href={`/main/${client.key}`}
    >
      <div className={`w-[95%] h-full flex flex-col`}>
        <span className={`${styles.clientId}`}>
          No.<span className={`${styles.clientIdNumber}`}>{client.id}</span>
        </span>
        <span className={`${styles.clientName}`}>{client.comName}</span>
        <div className={`${styles.tag} flex gap-6 h-[35px] justify-between`}>
          <span className={`${styles.usage} relative`}>{client.totalCount}</span>
          <span className={`${styles.week}`}>{client.subscription}weeks</span>
          <span
            style={
              client.availability ? { backgroundColor: '#1F9DFF' } : { backgroundColor: '#FF8090' }
            }
            className={`${styles.state}`}
          >
            {client.availability ? 'Stable' : 'Pause'}
          </span>
        </div>
      </div>
      <div className={`w-[5%] h-[100%] flex justify-center items-center`}>
        <FaChevronRight />
      </div>
    </Link>
  );
}
