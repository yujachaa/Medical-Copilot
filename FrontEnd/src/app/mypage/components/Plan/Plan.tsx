import styles from './Plan.module.scss';

export default function Plan() {
  return (
    <div className={`${styles.main} rounded-[20px] p-6 flex flex-col gap-4 w-full h-fit`}>
      <span className={`${styles.title} text-[32px]`}>Plan</span>
      <div className={`flex w-full h-full gap-6`}>
        <div className={`${styles.planInfo} bg-white`}>
          <span className={`${styles.planTitle}`}>Default</span>
          <span>50tokens / week</span>
        </div>
        <div className={`${styles.planInfo}`}>
          <span className={`${styles.planTitle}`}>Silver</span>
          <span>100tokens / week</span>
        </div>
        <div className={`${styles.planInfo}`}>
          <span className={`${styles.planTitle}`}>Gold</span>
          <span>200tokens / week</span>
        </div>
        <div className={`${styles.planInfo}`}>
          <span className={`${styles.planTitle}`}>Platinum</span>
          <span>500tokens / week</span>
        </div>
      </div>
    </div>
  );
}
