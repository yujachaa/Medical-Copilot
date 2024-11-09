'use server';

import { getCookie } from '@/utils/cookie';
import { redirect } from 'next/navigation';

export async function updateName(name: string) {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
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
      console.log(response);
      throw new Error('응답이 없습니다.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePW(currentPW: string, password: string) {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }

    console.log('엑세스 토큰', accessToken);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/update-password`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ currentPW: currentPW.trim(), password: password.trim() }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('응답이 없습니다.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
