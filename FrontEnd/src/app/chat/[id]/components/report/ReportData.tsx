import styles from './ReportData.module.scss';
import ImageSection from './ImageSection';
import PatientInfo from './PatientInfo';
import Diagnosis from './Diagnosis';

export default function ReportData() {
  return (
    <div className={styles.container}>
      <ImageSection />
      <PatientInfo />
      <Diagnosis />
    </div>
  );
}
