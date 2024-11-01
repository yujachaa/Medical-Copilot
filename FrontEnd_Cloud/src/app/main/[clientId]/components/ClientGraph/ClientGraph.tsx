import ClientPlugInUsage from '../ClientPlugInUsage/ClientPlugInUsage';
import ClientRequest from '../ClientRequest/ClientRequest';
import styles from './ClientGraph.module.scss';

export default function ClientGraph() {
  return (
    <div className={`${styles.main} flex gap-6 h-[55%] min-h-[350px]`}>
      <ClientPlugInUsage />
      <ClientRequest />
    </div>
  );
}
