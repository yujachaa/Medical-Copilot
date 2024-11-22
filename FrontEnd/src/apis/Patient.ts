'use server';
import { PatientReqeust } from '@/redux/features/tab/tabSlice';
import { BaseURL, GPUURL } from './core';
import { getCookie } from '@/utils/cookie';
import { redirect } from 'next/navigation';

//interceptor 추가 예정
export async function fetchPatient(page: number, size: number) {
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

// export async function fetchPatientChat(pid: number) {
//   try {
//     const response = await fetch(`${BaseURL}chat/${pid}`, {
//       cache: 'no-store',
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('응답이 없습니다.');
//     }
//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

//main에서 호출할 예정
export async function fetchCallAI(PatientReqeust: PatientReqeust) {
  const accessToken = getCookie('accessToken');
  try {
    const response = await fetch(`${BaseURL}agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(PatientReqeust),
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

export async function fetchPatientHistory() {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      // 토큰 없으면 로그인 페이지로 리다이렉트
      redirect('/login?message=login_required');
    }
    const response = await fetch(`${BaseURL}history/member`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
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
export type NoPatientQuestion = {
  comment: string;
  isQuestion: boolean;
  PID: string;
  member_id: string;
  agent: string | null;
  chat_list: { message: string; isQuestion: boolean }[];
  summary: string;
};

export type chatType = {
  message: string;
  isQuestion: boolean;
};
export async function fetcMedicalAI(datas: NoPatientQuestion) {
  try {
    // First API Request: medical_chat
    const chatResponse = await fetch(`${GPUURL}medical_chat`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    });

    if (!chatResponse.ok) {
      throw new Error('medical_chat API 응답이 없습니다.');
    }

    const chatData = await chatResponse.json();

    const usageBody = {
      key: 'ccf97220-30b3-4780-acab-295301698be0', // corpKey
      agent: 'MedGuru',
    };
    // Second API Request: /api/usage/medical_chat
    const usageResponse = await fetch(`https://k11s205.p.ssafy.io/cloud/api/usage/medical_chat`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usageBody),
    });

    if (!usageResponse.ok) {
      throw new Error('/api/usage/medical_chat API 응답이 없습니다.');
    }

    const usageData = await usageResponse.text();
    console.log(usageData);

    // Combine the results if necessary
    return chatData;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
  }
}
