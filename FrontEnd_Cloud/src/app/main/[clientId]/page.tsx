import { clientDetail } from '@/types/client';
import ClientBtn from './components/ClientBtn/ClientBtn';
import ClientGraph from './components/ClientGraph/ClientGraph';
import ClientInfo from './components/ClientInfo/ClientInfo';
import styles from './page.module.scss';
import { fetchClientDetail } from '@/apis/fetchClientDetail';
// import LogModal from './components/LogModal/LogModal';

export default async function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const data: clientDetail = await fetchClientDetail(params.clientId);
  console.log(params.clientId);
  return (
    <div className={`${styles.main} w-screen flex`}>
      <div className={`w-screen flex flex-col p-6`}>
        {data && <ClientInfo data={data} />}
        <ClientBtn />
        <ClientGraph />
      </div>
      {/* <LogModal /> */}
    </div>
  );
}
