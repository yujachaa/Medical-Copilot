import { BaseURL } from './core';

interface CoordinatesGroup {
  points: { x: number; y: number }[];
}

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
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
