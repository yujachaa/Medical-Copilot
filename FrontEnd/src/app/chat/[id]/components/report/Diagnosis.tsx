import styles from './ReportData.module.scss';
import { TbEdit } from 'react-icons/tb';

export default function Diagnosis() {
  return (
    <div className={`${styles.info}`}>
      <div>Diagnosis</div>
      <div className={styles.infoBox}>
        {['Labels', 'Location', 'Size', 'Symptoms'].map((label, index) => (
          <div
            key={index}
            className="w-full"
          >
            <div className={styles.oneInfo}>
              <div className="text-white flex-grow">• {label}</div>
              <div className="flex gap-[2px]">
                <div className="text-white">|</div>
                <input className={styles.infoInput} />
              </div>
            </div>
            {index < 3 && <hr />}
          </div>
        ))}
      </div>

      <div className={styles.editorBtn}>
        <TbEdit />
      </div>
    </div>
  );
}
