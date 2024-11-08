import styles from './MyPageTab.module.scss';

export default function MyPageTab({
  isSelectedTab,
  setIsSelectedTab,
}: {
  isSelectedTab: boolean;
  setIsSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={`${styles.main} w-full h-[80px] flex justify-center items-end gap-20`}>
      <span
        className={`${styles.tab} ${isSelectedTab && styles.active} flex justify-center items-center w-[100px] h-[50px]`}
        onClick={() => {
          setIsSelectedTab(true);
        }}
      >
        Profile
      </span>
      <span
        className={`${styles.tab} ${!isSelectedTab && styles.active} flex justify-center items-center w-[100px] h-[50px]`}
        onClick={() => {
          setIsSelectedTab(false);
        }}
      >
        Plan
      </span>
    </div>
  );
}
