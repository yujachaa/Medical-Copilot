import styles from './SideBar.module.scss';

export default function SideBar() {
  return (
    <div className={`w-[70] h-screen flex flex-col border justify-between ${styles.main}`}>
      <div>로고</div>
      <div>메뉴들</div>
      <div>로그아웃</div>
    </div>
  );
}
