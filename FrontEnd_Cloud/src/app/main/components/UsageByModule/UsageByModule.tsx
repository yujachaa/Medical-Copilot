import styles from './UsageByModule.module.scss';
import UsageByModuleGraph from './UsageByModuleGraph';

export default function UsageByModule() {
  return (
    <div className={`${styles.main} w-full box-border p-3 flex flex-col`}>
      <div className={`flex justify-between h-[40] items-center`}>
        <span className={`${styles.title} text-2xl`}>Usage graph by module</span>
        <div className={`${styles.standard} flex gap-3 text-xl`}>
          <span style={{ backgroundColor: '#6EA7E9', color: 'white' }}>Year</span>
          <span>Mon</span>
          <span>Week</span>
        </div>
      </div>
      <div className={`w-full h-full min-h-[200]`}>
        <UsageByModuleGraph />
      </div>
    </div>
  );
}
