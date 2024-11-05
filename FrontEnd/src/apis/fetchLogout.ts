export async function fetchLogout(accessToken: string) {
  try {
    const response = await fetch(`https://k11s205.p.ssafy.io/onpremise/api/member/logout`, {
      method: 'GET',
      body: JSON.stringify({ accessToken }),
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
