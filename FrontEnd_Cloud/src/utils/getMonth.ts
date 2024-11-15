function getMonthFromIndex(index: number): string {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - (12 - index));

  // 결과 문자열 반환
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  return `${year % 100}/${month}`;
}

export { getMonthFromIndex };
