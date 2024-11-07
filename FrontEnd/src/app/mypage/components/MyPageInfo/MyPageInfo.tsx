'use client';

import { useState } from 'react';
import MyPageTab from '../MyPageTab/MyPageTab';
import UserProfile from '../UserProfile/UserProfile';
import Plan from '../Plan/Plan';

export default function MyPageInfo() {
  const [isSelectedTab, setIsSelectedTab] = useState<boolean>(true);

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
