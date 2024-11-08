export async function fetchUsageByModule(standard: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}cloud/api/usage/${standard === 0 ? 'yearly' : standard === 1 ? 'monthly' : 'weekly'}`,
    );
    if (!response.ok) {
      throw new Error('값을 못받아왔어요');
    }
    const data = await response.json();
    return data;
    //   return data.data;
  } catch (error) {
    console.log(error);
  }
}
