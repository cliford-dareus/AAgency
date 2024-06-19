import { createSlice } from "@reduxjs/toolkit";


export type Event = {
    id: number;
    date: Date;
    text: string;
    duration: number;
    roomId: number;
}
type InitialStateProps = {
  events: Event[];
};

const initialState = {
  events: [
    {
      id: 1,
      date: new Date(2024, 5, 16, 5),
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
  ],
} as InitialStateProps;


export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    moveEvent: (state, action) => {
        state.events = action.payload
    },
  },
});

export const {addEvent, moveEvent} = eventsSlice.actions;
export default eventsSlice.reducer;
