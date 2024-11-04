import { TbEdit } from 'react-icons/tb';
import styles from './ReportData.module.scss';

export default function Summary() {
  const summaryText =
    'Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.';

  return (
    <div className="">
      <div className={`${styles.summary}`}>
        <div>Brief Summary</div>
        <div className={styles.image}>{summaryText}</div>
        <div className={styles.editorBtn}>
          <TbEdit />
        </div>
      </div>
    </div>
  );
}
