'use client';

import { clientDetail } from '@/types/client';
import ClientBtn from './components/ClientBtn/ClientBtn';
import ClientGraph from './components/ClientGraph/ClientGraph';
import ClientInfo from './components/ClientInfo/ClientInfo';
import styles from './page.module.scss';
import { fetchClientDetail } from '@/apis/fetchClientDetail';
import { useEffect, useState } from 'react';
// import LogModal from './components/LogModal/LogModal';

export default function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const [clientDetail, setClientDetail] = useState<clientDetail>();
  const [standard, setStandard] = useState<number>(0);
  useEffect(() => {
    const fetchDetail = async () => {
      const data = await fetchClientDetail(params.clientId);
      if (data) {
        setClientDetail(data);
      }
    };
    fetchDetail();
  }, [params.clientId]);
  return (
    <div className={`${styles.main} w-screen flex`}>
      <div className={`w-screen flex flex-col p-6`}>
        {clientDetail && <ClientInfo data={clientDetail} />}
        <ClientBtn
          standard={standard}
          setStandard={setStandard}
        />
        <ClientGraph
          standard={standard}
          serialKey={params.clientId}
        />
      </div>
      {/* <LogModal /> */}
    </div>
  );
}
