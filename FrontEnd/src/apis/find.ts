import { MessageType } from '@/app/main/components/Diagnosis/ChatLayout';
import { GPUURL } from './core';
import { ReportDataType } from '@/types/report';

export async function find(messagelist: MessageType[], reportData: ReportDataType) {
  try {
    const response = await fetch(`${GPUURL}generate_find`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        member_id: reportData.memberId,
        summary: reportData.summary,
        disease: reportData.disease,
        bbox: '',
        chat_list: messagelist,
      }),
    });
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.find;
  } catch (error) {
    console.log(error);
  }
}
