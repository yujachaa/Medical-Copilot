import { GPUURL } from './core';
import { ReportDataType } from '@/types/report';

export async function fetchImpression(finding: string, reportData: ReportDataType) {
  try {
    const response = await fetch(`${GPUURL}generate_impression`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: reportData.memberId,
        find: finding,
      }),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.impression;
  } catch (error) {
    console.log(error);
  }
}
