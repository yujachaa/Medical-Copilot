// import Cookies from 'js-cookie';
'use server';

import { getCookie } from '@/utils/cookie';

export async function updateName(name: string) {
  console.log('11111111111111111111111111');
  try {
    // js-cookie를 사용하여 accessToken 가져오기
    // const accessToken = Cookies.get('accessToken'); // 쿠키 이름이 'accessToken'인 경우

    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      throw new Error('토큰이 없습니다.');
    }

    console.log('엑세스 토큰', accessToken);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/update`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: name.trim() }),
    });

    if (!response.ok) {
      console.log(response.status);
      throw new Error('응답이 없습니다.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
