import Cookies from 'js-cookie';

export async function fetchLogin(username: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/member/login`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('이메일 비밀번호를 확인해주세요.');
    }
    const data = await response.json();
    // accessToken을 쿠키에 저장 (1시간 유효)
    Cookies.set('accessToken', data.data, { expires: 30 });
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
