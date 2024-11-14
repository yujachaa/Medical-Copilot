'use server';

import { redirect } from 'next/navigation';
import { BaseURL } from './core';
import { getCookie } from '@/utils/cookie';

export async function fetchAlarmOTP() {
  try {
    const response = await fetch(`${BaseURL}notification/otp`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export async function fetchAllAlarm() {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }
    const response = await fetch(`${BaseURL}notification/all`, {
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

export async function readAlarm(notificationId: number) {
  try {
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }
    const response = await fetch(`${BaseURL}notification/${notificationId}`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function readAllAlarm() {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }
    const response = await fetch(`${BaseURL}notification/readAll`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
  }
}
