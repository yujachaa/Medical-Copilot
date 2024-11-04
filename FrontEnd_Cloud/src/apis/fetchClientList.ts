export async function fetchClientList() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cloud/api/corporate`);
    if (!response.ok) {
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
