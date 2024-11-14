'use server';

import { PatientReqeust } from '@/redux/features/main/mainSlice';
import { BaseURL } from './core';
import { getCookie } from '@/utils/cookie';
import { redirect } from 'next/navigation';

//interceptor 추가 예정
export async function fetchPatient(page: number, size: number) {
  try {
    const response = await fetch(`${BaseURL}patient/recent/${page}/${size}`, {
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
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPatientChat(pid: number) {
  try {
    const response = await fetch(`${BaseURL}chat/${pid}`, {
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
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

//main에서 호출할 예정
export async function fetchCallAI(PatientReqeust: PatientReqeust) {
  try {
    const response = await fetch(`${BaseURL}agent`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(PatientReqeust),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    console.log(data);
    return;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPatientHistory() {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }
    const response = await fetch(`${BaseURL}history/member`, {
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
