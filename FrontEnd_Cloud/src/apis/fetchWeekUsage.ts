export async function fetchWeekUsage(key: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/usage/quota/${key}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('로그아웃 실패');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
