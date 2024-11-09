import { BaseURL } from './core';

export async function fetchReport(reportId: string) {
  try {
    const response = await fetch(`${BaseURL}report/${reportId}`, {
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
    return;
  } catch (error) {
    console.log(error);
  }
}
