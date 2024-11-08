export async function fetchClientDetail(clientId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/corporate/${clientId}`,
    );
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
