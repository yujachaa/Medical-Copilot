import styles from './Request.module.scss';
import RequestGraph from './RequestGraph';

export default function Request() {
  return (
    <div className={`${styles.main} p-3 flex flex-col`}>
      <span className={`${styles.title} text-2xl`}>Request Queue</span>
      <RequestGraph />
    </div>
  );
}
