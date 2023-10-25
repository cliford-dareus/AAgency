import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "../features/scheduler/schedulerSlice";
import unitReducer from "../features/units/unitSlice";
import shiftsReducer from "../features/shifts/shiftSlice";
import boardReducer from "../features/board/boardSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    shedule: scheduleReducer,
    unit: unitReducer,
    shifts: shiftsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
