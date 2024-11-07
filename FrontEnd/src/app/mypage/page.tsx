import MyPageInfo from './components/MyPageInfo/MyPageInfo';
import MyPageTitle from './components/MyPageTitle/MyPageTitle';

export default function MypagePage() {
  return (
    <div className={`p-6 w-full h-full flex flex-col gap-6 items-center overflow-y-scroll`}>
      <MyPageTitle />
      <MyPageInfo />
    </div>
  );
}
