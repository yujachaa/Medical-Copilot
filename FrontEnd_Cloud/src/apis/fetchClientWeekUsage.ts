// 'use client'

import { clientDetail } from '@/types/client';

export async function fetchClientWeekUsage(client: clientDetail) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/usage/token/${client.key}`,
      {
        cache: 'no-store',
      },
    );
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
