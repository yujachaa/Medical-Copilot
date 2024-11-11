'use server';

import { setCookie } from '@/utils/cookie';

export async function fetchLogout(accessToken: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ accessToken }),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    setCookie('accessToken', '', {
      maxAge: 0, //쿠키삭제
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
