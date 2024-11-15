import styles from './ClientPlugInUsage.module.scss';
import ClientUsage from './ClientUsage';

export default function ClientPlugInUsage({
  standard,
  serialKey,
}: {
  standard: number;
  serialKey: string;
}) {
  return (
    <div className={`${styles.usage} w-[40%] h-full rounded-[10px]`}>
      <div className={`${styles.main} p-3 h-full flex flex-col`}>
        <span className={`${styles.title} text-2xl`}>Total Plug-In Usage</span>
        <div className={`w-full h-[100%] flex justify-center items-center`}>
          <ClientUsage
            standard={standard}
            serialKey={serialKey}
          />
        </div>
      </div>
    </div>
  );
}
