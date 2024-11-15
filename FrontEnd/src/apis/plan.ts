import { GPUURL } from './core';
import { ReportDataType } from '@/types/report';

export async function fetchPlan(impression: string, reportData: ReportDataType) {
  try {
    const response = await fetch(`${GPUURL}generate_plan`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: reportData.memberId,
        impression: impression,
      }),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.plan;
  } catch (error) {
    console.log(error);
  }
}
