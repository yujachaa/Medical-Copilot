'use client';

import { clientDetail } from '@/types/client';
import ClientBtn from './components/ClientBtn/ClientBtn';
import ClientGraph from './components/ClientGraph/ClientGraph';
import ClientInfo from './components/ClientInfo/ClientInfo';
import styles from './page.module.scss';
import { fetchClientDetail } from '@/apis/fetchClientDetail';
import { useEffect, useState } from 'react';
import WarningModal from './components/WarningModal/WarningModal';
import { useAppSelector } from '@/redux/store/hooks/store';
import ClientModify from './components/ClientModify/ClientModify';
import { useDispatch } from 'react-redux';
import { setIsStarted } from '@/redux/features/modal/modalSlice';
// import LogModal from './components/LogModal/LogModal';

export default function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const [clientDetail, setClientDetail] = useState<clientDetail>();
  const [standard, setStandard] = useState<number>(2);
  const warningModal = useAppSelector((state) => state.modal.warning);
  const clientModifyModal = useAppSelector((state) => state.modal.clientModify);
  const isStarted = useAppSelector((state) => state.modal.isStarted);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await fetchClientDetail(params.clientId);
      if (data) {
        setClientDetail(data);
        console.log('클라이언트 데이터', data);
      }
    };
    fetchDetail();
    if (isStarted) dispatch(setIsStarted(false));
  }, [params.clientId, clientModifyModal, warningModal, isStarted]);
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
      {warningModal && clientDetail && <WarningModal clientDetail={clientDetail} />}
      {clientModifyModal && clientDetail && <ClientModify clientDetail={clientDetail} />}
      {/* <LogModal /> */}
    </div>
  );
}
