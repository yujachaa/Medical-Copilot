import { useRouter } from 'next/navigation';
import styles from './MyPageTab.module.scss';

export default function MyPageTab({
  isSelectedTab,
  setIsSelectedTab,
}: {
  isSelectedTab: boolean;
  setIsSelectedTab: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const handleTabClick = (tab: 'profile' | 'plan') => {
    setIsSelectedTab(tab === 'profile');
    router.replace(`/medical/mypage?t=${tab}`);
  };

  return (
    <div className={`${styles.main} w-full h-[80px] flex justify-center items-end gap-20`}>
      <span
        className={`${styles.tab} ${isSelectedTab && styles.active} flex justify-center items-center w-[100px] h-[50px]`}
        onClick={() => handleTabClick('profile')}
      >
        Profile
      </span>
      <span
        className={`${styles.tab} ${!isSelectedTab && styles.active} flex justify-center items-center w-[100px] h-[50px]`}
        onClick={() => handleTabClick('plan')}
      >
        Plan
      </span>
    </div>
  );
}
