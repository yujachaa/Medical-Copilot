import styles from './RegistTitle.module.scss';

export default function RegistTitle() {
  return (
    <div className={`flex flex-col`}>
      <span className={styles.title}>MEDICAL COPILOT</span>
      <span className={`${styles.madeBy} flex justify-end`}>made by Newmes</span>
    </div>
  );
}
