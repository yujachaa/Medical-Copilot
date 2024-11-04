import styles from './ReportData.module.scss';

export default function PatientInfo() {
  return (
    <div className={`${styles.info}`}>
      <div>Patient Information</div>
      <div className={styles.infoBox}>
        {['Patient ID', 'Sex', 'Age', 'Shooting Date'].map((label, index) => (
          <div
            key={index}
            className="w-full"
          >
            <div className={styles.oneInfo}>
              <div
                className={`text-white flex-grow ${label === 'Shooting Date' ? 'tracking-tighter' : ''}`}
              >
                • {label}
              </div>
              <div className="flex gap-[2px]">
                <div className="text-white">|</div>
                <input className={styles.infoInput} />
              </div>
            </div>
            {index < 3 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
}
