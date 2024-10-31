import styles from './LoginTitle.module.scss';

export default function LoginTitle() {
  return (
    <div className={`flex flex-col`}>
      <span className={styles.title}>MEDICAL COPILOT</span>
      <span className={`${styles.madeBy} flex justify-end`}>for Admin</span>
    </div>
  );
}
