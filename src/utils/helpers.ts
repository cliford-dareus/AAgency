import { start } from "repl";

export const range = (key: number) => [...Array(key).keys()];

export const rangeAbs = (end: number) => {
  const result = Array.from({ length: end }).reduce(
    ({ result, current }) => ({
      result: [...result, current],
      current: current + 1,
    }),
    { result: [], current: 1 }
  );
  return result.result;
};

export const isSameDate = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const addDateBy = (date: Date, count: number) => {
  const d = new Date(date);
  return new Date(d.setDate(d.getDate() + count));
};

export const getfirstDayOfWeek = () => {
  const today = new Date();
  const firt = today.getDate() - today.getDay();
  return new Date(today.setDate(firt));
};

export const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

// export const getSortedDays = (date: Date) => {
//   const daysInMonth = rangeAbs(getDaysInMonth(date));
//   const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
//   return [...Array(index == 0 ? 6 : index), ...daysInMonth];
// };

export const firstDayOfTheMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

export const getSortedDays = (currentDate: Date) => {
  const days = Array(35)
    .fill(0)
    .map((_, j) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      date.setDate(date.getDate() + j - firstDayOfTheMonth(currentDate));
      return date;
    });
  return days;
};

export const hourNow = new Date().getHours();
export const minuteNow = new Date().getMinutes();

// hours : 0 - 23 minutes : 0 - 59
export const events = [
  {
    id: 1,
    date: new Date(2024, 2, 30, 9),
    text: "test",
    duretion: 5,
    roomId: 3,
  },
  {
    id: 2,
    date: new Date(2024, 2, 24, 3),
    text: "test",
    duretion: 2,
    roomId: 2,
  },
  {
    id: 3,
    date: new Date(2024, 2, 28, 3),
    text: "test",
    duretion: 2,
    roomId: 2,
  },
];

export const rooms = [
  { id: 1, name: "room 1" },
  { id: 2, name: "room 2" },
  { id: 3, name: "room 3" },
];

// Board with rooms and work hours
//
// {
//   id: 1,
//   name: "board 1",
//   user: 1,
//   startTime: '09:00', *
//   endTime: '18:00', *
//   description: "test",
//   rooms: [],
// }
// * -> maybe //

// schedule
// {
//   id:  1,
//   name: "first",
//   start: new Date(),
//   end: new Date(),
//   room: 1,
//   user: 1,
//   description: "test",
// }

// Event
// {
//   id: 1,
//   board: 1,
//   user: 1,
//   date: new Date(),
//   text: "test",
//   duretion: 1,
// }
