import styles from './ReportData.module.scss';

export default function Summary() {
  const summaryText =
    'Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.Analyze the chest X-ray image and provide a detailed report on your findings.';

  return (
    <div className="">
      <div className={`${styles.info}`}>
        <div>Brief Summary</div>
        <div className={styles.image}>{summaryText}</div>
      </div>
    </div>
  );
}
