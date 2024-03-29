import { configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "../features/scheduler/schedulerSlice";
import unitReducer from "../features/units/unitSlice";
import shiftsReducer from "../features/shifts/shiftSlice";
import boardReducer from "../features/board/boardSlice";
import userReducer from "../features/user/userSlice";
import sidebarReducer from "../features/Interface-controls/sidebar/sidebar-slice";
import topbarReducer from "../features/Interface-controls/topbar/topbar-slice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    topbar: topbarReducer,
    board: boardReducer,
    shedule: scheduleReducer,
    unit: unitReducer,
    shifts: shiftsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
