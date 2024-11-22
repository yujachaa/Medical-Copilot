'use client';

import { useEffect, useState } from 'react';
import MyPageTab from '../MyPageTab/MyPageTab';
import UserProfile from '../UserProfile/UserProfile';
import Plan from '../Plan/Plan';

type MyPageInfoProps = {
  isProfile: boolean;
};

export default function MyPageInfo({ isProfile }: MyPageInfoProps) {
  const [isSelectedTab, setIsSelectedTab] = useState<boolean>(isProfile);

  useEffect(() => {
    setIsSelectedTab(isProfile);
  }, [isProfile]);
  return (
    <>
      <MyPageTab
        isSelectedTab={isSelectedTab}
        setIsSelectedTab={setIsSelectedTab}
      />
      {isSelectedTab ? <UserProfile /> : <Plan />}
    </>
  );
}
