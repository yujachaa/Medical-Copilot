'use client';

import { client } from '@/types/client';
import ClientBtn from './components/ClientBtn/ClientBtn';
import ClientGraph from './components/ClientGraph/ClientGraph';
import ClientInfo from './components/ClientInfo/ClientInfo';
import styles from './page.module.scss';
import { useState } from 'react';
import LogModal from './components/LogModal/LogModal';

const data: client = {
  id: 1,
  comName: 'Newmes111',
  grade: 'DEFAULT',
  key: '2a197cf4-de8a-4fb4-b768-70bba6c9b3a4',
  cxrCount: 0,
  capsuleCount: 0,
  medGuruCount: 0,
  totalCount: 0,
};

export default function ClientDetailPage() {
  const [logModal, setLogModal] = useState<boolean>(false);

  return (
    <div className={`${styles.main} w-screen flex`}>
      <div className={`w-screen flex flex-col p-6`}>
        <ClientInfo data={data} />
        <ClientBtn setLogModal={setLogModal} />
        <ClientGraph />
      </div>
      {logModal ? <LogModal setLogModal={setLogModal} /> : null}
    </div>
  );
}
