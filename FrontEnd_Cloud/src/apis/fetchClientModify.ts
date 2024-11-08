export async function fetchClientModify(serialKey: string, comName: string, grade: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/corporate/${serialKey}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comName, grade }),
      },
    );
    if (!response.ok) {
      throw new Error('수정 실패');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
