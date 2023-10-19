import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "../features/scheduler/schedulerSlice";

export const store = configureStore({
  reducer: {
    shedule: scheduleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
