import { fetchClientList } from '@/apis/fetchClientList';
import ClientListItem from '../ClientListItem/ClientListItem';
import styles from './ClientListBox.module.scss';
import { IoSearch } from 'react-icons/io5';

type dataType = { id: number; comName: string; grade: string; key: string }[];

export default async function ClientListBox() {
  const data: dataType = await fetchClientList();
  return (
    <div className={`${styles.main} p-3 flex flex-col min-h-[600px] gap-3`}>
      <div className={`flex justify-between w-full h-[30px] items-center`}>
        <span className={`${styles.title} text-2xl`}>Client List</span>
        <IoSearch className={`${styles.search} text-3xl`} />
      </div>
      {data && (
        <div className={`${styles.items} w-full h-full flex flex-col gap-3 overflow-y-scroll`}>
          {data.map((client) => {
            return (
              <ClientListItem
                key={client.id}
                client={client}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
