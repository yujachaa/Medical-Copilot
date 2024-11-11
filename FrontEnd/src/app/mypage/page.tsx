'use client';

import { useSearchParams } from 'next/navigation';
import MyPageInfo from './components/MyPageInfo/MyPageInfo';
import MyPageTitle from './components/MyPageTitle/MyPageTitle';

export default function MypagePage() {
  const params = useSearchParams();
  const t = params.get('t');
  const isProfile = t === 'profile';

  return (
    <div className="p-6 w-full h-full flex flex-col gap-6 items-center overflow-y-scroll">
      <MyPageTitle />
      <MyPageInfo isProfile={isProfile} />
    </div>
  );
}
