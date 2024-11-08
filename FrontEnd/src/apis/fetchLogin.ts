export async function fetchLogin(email: string, password: string) {
  console.log(process.env.NEXT_PUBLIC_SERVER_URL);
  try {
    const response = await fetch(`https://k11s205.p.ssafy.io/onpremise/api/member/login`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
