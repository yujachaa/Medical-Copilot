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
      const errorText = await response.text();
      throw { message: errorText, status: response.status }; // 에러 코드 포함
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    throw error; // 에러를 다시 던짐
  }
}
