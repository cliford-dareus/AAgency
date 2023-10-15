import { useState } from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  // To change the month, set the current date state to the month you wish
  // setCurrenDay(new Date(day.year, day.month, day.number))

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

  return (
    <div className="">
      <div>
        {months[currentDay.getMonth()]} {currentDay.getFullYear()}
      </div>
      
      <div className="flex">
        {weekdays.map((weekday) => {
          return (
            <div className="w-[40px]">
              <p>{weekday}</p>
            </div>
          );
        })}
      </div>

      <div className="flex">
        {" "}
        {currentDays.slice(currentDayIndex).map((day) => {
          return (
            <div className="w-[40px]">
              <p>{day.number}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
