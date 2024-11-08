import { BaseURL } from './core';

//interceptor 추가 예정
export async function fetchPatient(page: number, size: number) {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL);
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
