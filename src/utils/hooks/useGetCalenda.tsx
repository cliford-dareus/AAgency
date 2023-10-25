import { useState } from "react";

const useGetCalenda = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  const firstDayOfMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    1
  );

  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === currentDay.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === currentDay.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
  }

  let currentDayIndex;
  currentDays.forEach((day, index) => {
    if (day.date.getDate() === currentDay.getDate())
      return (currentDayIndex = index);
  });

  const currentScheduleDay = currentDays[currentDayIndex!];
  const dayParam = new Date(currentScheduleDay.date).toDateString();

  return {
    currentDayIndex,
    currentDay,
    setCurrentDay,
    currentDays,
    dayParam,
    currentScheduleDay,
  };
};

export default useGetCalenda;
