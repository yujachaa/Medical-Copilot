'use server';

import { setCookie } from '@/utils/cookie';

export async function fetchLogin(email: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/login`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim(), password: password.trim() }),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    setCookie('accessToken', data.data.status.accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30, //30일
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
