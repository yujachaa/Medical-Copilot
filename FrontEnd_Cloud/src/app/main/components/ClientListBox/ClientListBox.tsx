import ClientListItem from '../ClientListItem/ClientListItem';
import styles from './ClientListBox.module.scss';
import { IoSearch } from 'react-icons/io5';

type dataType = { id: number; clientName: string; usageAi: number; week: number; state: string }[];

const data: dataType = [
  {
    id: 12341574,
    clientName: 'SAMSUNG',
    usageAi: 1000,
    week: 30,
    state: 'Stable',
  },
  {
    id: 63462354,
    clientName: 'LG',
    usageAi: 4000,
    week: 10,
    state: 'Error',
  },
  {
    id: 26352354,
    clientName: 'SK',
    usageAi: 3000,
    week: 20,
    state: 'Stable',
  },
  {
    id: 34721455,
    clientName: 'KT',
    usageAi: 2000,
    week: 40,
    state: 'Error',
  },
  {
    id: 12341574,
    clientName: 'SAMSUNG',
    usageAi: 1000,
    week: 30,
    state: 'Stable',
  },
  {
    id: 63462354,
    clientName: 'LG',
    usageAi: 4000,
    week: 10,
    state: 'Error',
  },
  {
    id: 26352354,
    clientName: 'SK',
    usageAi: 3000,
    week: 20,
    state: 'Stable',
  },
  {
    id: 34721455,
    clientName: 'KT',
    usageAi: 2000,
    week: 40,
    state: 'Error',
  },
];

export default function ClientListBox() {
  return (
    <div className={`${styles.main} p-3 flex flex-col min-h-[600px] gap-3`}>
      <div className={`flex justify-between w-full h-[30px] items-center`}>
        <span className={`${styles.title} text-2xl`}>Client List</span>
        <IoSearch className={`${styles.search} text-3xl`} />
      </div>
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
    </div>
  );
}
