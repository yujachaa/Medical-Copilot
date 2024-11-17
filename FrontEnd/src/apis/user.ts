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
      throw new Error('응답이 없습니다.');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePW(currentPw: string, password: string) {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/update-password`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ currentPw: currentPw.trim(), password: password.trim() }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('현재 비밀번호가 일치하지 않습니다.');
      } else {
        throw new Error('응답이 없습니다.');
      }
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return null; // 에러 발생 시 null 반환
  }
}

export async function fetchQuota() {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quota/weekly-count`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
