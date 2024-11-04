export async function fetchClientDetail(clientId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cloud/api/corporate/${clientId}`,
    );
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
