import RemainBar from '../RemainBar/RemainBar';
import styles from './MyPageTitle.module.scss';

export default function MyPageTitle() {
  return (
    <div className={`${styles.main} flex justify-center`}>
      <div className={`flex gap-6`}>
        <span className={`${styles.mypage}`}>MyPage</span>
        <div className={`flex flex-col justify-end`}>
          <div className={`${styles.remaintext} flex justify-between items-end w-[270px]`}>
            <span>Remaining Usage</span>
            <span className={`text-[20px]`}>10 / 50</span>
          </div>
          <RemainBar data={30} />
        </div>
      </div>
    </div>
  );
}
