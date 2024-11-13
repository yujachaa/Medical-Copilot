import { BaseURL } from './core';
import { CoordinatesGroup } from '@/types/report';

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
  } catch (error) {
    console.log(error);
  }
}

export async function updateReport(
  reportId: string,
  updatedData: {
    disease: string;
    location: string;
    size: string;
    symptoms: string;
    summary: string;
  },
) {
  try {
    const response = await fetch(`${BaseURL}report/${reportId}`, {
      cache: 'no-store',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), // Redux에서 받은 데이터를 body에 추가
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

export async function updateDrawing(reportId: string, coordinatesGroups: CoordinatesGroup[]) {
  try {
    const response = await fetch(`${BaseURL}drawing/${reportId}`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coordinatesGroups: coordinatesGroups }),
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

export async function fetchDrawing(reportId: string) {
  try {
    const response = await fetch(`${BaseURL}drawing/${reportId}`, {
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
