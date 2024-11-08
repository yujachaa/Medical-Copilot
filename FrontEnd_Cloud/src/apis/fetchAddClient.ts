export async function fetchAddClient(comName: string, grade: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/corporate`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comName, grade }),
    });
    if (!response.ok) {
      throw new Error('등록에 실패했습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
