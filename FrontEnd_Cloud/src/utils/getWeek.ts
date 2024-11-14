function getWeekRange(index: number): string {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const offsetToMonday = currentDay === 0 ? 6 : currentDay - 1; // 월요일까지의 오프셋

  // index가 1일 때 4주 전, 5일 때 이번 주
  const weeksAgo = 5 - index;

  // 주의 월요일 계산
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - offsetToMonday - weeksAgo * 7);

  // 주의 마지막 날짜 계산
  const endDate = new Date(startDate);
  if (weeksAgo === 0) {
    // index가 5일 때 이번 주는 월요일(오늘)부터 오늘까지
    endDate.setDate(currentDate.getDate());
  } else {
    // 그 외는 일요일까지
    endDate.setDate(startDate.getDate() + 6);
  }

  // 결과 문자열 포맷팅
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
  const startDay = String(startDate.getDate()).padStart(2, '0');
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');

  return `${startMonth}/${startDay} ~ ${endMonth}/${endDay}`;
}

export { getWeekRange };
