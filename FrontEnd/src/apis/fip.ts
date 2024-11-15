'use server';

import { BaseURL } from './core';

export async function fetchfip(reportId: string) {
  try {
    const response = await fetch(`${BaseURL}pdf/${reportId}`, {
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

export async function fetchInitfip(reportId: string) {
  try {
    const response = await fetch(`${BaseURL}pdf/reset/${reportId}`, {
      cache: 'no-store',
      method: 'PATCH',
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

export async function fetchfipSave(
  reportId: string,
  find: string,
  impression: string,
  plan: string,
) {
  try {
    const response = await fetch(`${BaseURL}pdf`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reportId,
        find,
        impression,
        plan,
      }),
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
