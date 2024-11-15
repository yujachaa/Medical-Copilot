function getSpecificDay(index: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - (7 - index));

  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${month}/${day}`;
}

export { getSpecificDay };
