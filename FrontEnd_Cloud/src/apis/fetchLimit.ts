export async function fetchLimit(serialKey: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/corporate/${serialKey}/limit`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error('정지/시작을 실패했습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
