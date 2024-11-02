import TotalUsageGraph from '@/app/main/components/TotalUsage/TotalUsageGraph';
import styles from './ClientPlugInUsage.module.scss';

export default function ClientPlugInUsage() {
  return (
    <div className={`${styles.usage} w-[40%] h-full rounded-[10]`}>
      <div className={`${styles.main} p-3 h-full flex flex-col`}>
        <span className={`${styles.title} text-2xl`}>Plug-In Usage</span>
        <div className={`w-full h-[100%]`}>
          <TotalUsageGraph />
        </div>
      </div>
    </div>
  );
}
