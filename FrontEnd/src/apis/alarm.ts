import { BaseURL } from './core';

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
