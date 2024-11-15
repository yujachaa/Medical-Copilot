import { BaseURL } from './core';

//interceptor 추가 예정
export async function fetchMessages(page: number, size: number, pid: string) {
  console.log(pid);
  try {
    const response = await fetch(`${BaseURL}chat/${pid}/${page}/${size}`, {
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
