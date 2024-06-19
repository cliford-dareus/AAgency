// hours : 0 - 23 minutes : 0 - 59
export const events = [
  {
    id: 1,
    date: new Date(2024, 2, 30, 9),
    text: "test",
    duration: 5,
    roomId: 3,
  },
  {
    id: 2,
    date: new Date(2024, 5, 16, 3),
    text: "test",
    duration: 2,
    roomId: 2,
  },
  {
    id: 3,
    date: new Date(2024, 5, 16, 5),
    text: "test",
    duration: 2,
    roomId: 2,
  },
];

export type Events =  typeof events;
export type Event =  typeof events[number];

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
