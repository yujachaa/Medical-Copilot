export async function fetchRegist(email: string, password: string, name: string) {
  try {
    const response = await fetch(`https://k11s205.p.ssafy.io/onpremise/api/member/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
        serialKey: '',
        role: 'ADMIN',
      }),
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
