import styles from './TotalUsage.module.scss';
import TotalUsageGraph from './TotalUsageGraph';

export default function TotalUsage() {
  return (
    <div className={`${styles.main} p-3 flex flex-col border`}>
      <span className={`${styles.title} text-2xl`}>Total Ai Usage</span>
      <div className={`flex-grow w-full flex justify-center`}>
        <div className="h-full aspect-[1.2]">
          <TotalUsageGraph />
        </div>
      </div>
    </div>
  );
}
