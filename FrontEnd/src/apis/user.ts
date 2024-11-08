export async function updateName(name: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/member/update`, {
      cache: 'no-store',
      method: 'PATCH',
      body: JSON.stringify({ name: name.trim() }),
    });
    if (!response.ok) {
      console.log(response.status);
      throw new Error('응답이 없습니다.');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
