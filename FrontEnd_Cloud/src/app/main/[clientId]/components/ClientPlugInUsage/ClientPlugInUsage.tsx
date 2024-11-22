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
        <div className={`flex-grow w-full flex justify-center`}>
          <div className="h-full aspect-[1.2]">
            <ClientUsage
              standard={standard}
              serialKey={serialKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
