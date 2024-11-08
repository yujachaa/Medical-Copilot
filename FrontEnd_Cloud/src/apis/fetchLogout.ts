export async function fetchLogout() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/member/logout`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
