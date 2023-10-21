import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Schedules } from "../../utils/type";

export const fetchSchedules = createAsyncThunk("schedules/fetch", async () => {
  const res = await fetch("http://localhost:3000/api/v1/schedule");
  const result = res.json();
  return result;
});

interface SchedulesState {
  schedules: Schedules[];
  isLoading: boolean;
}

const initialState = {
  schedules: [],
  isLoading: true
} as SchedulesState;

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSchedules.pending, (state) => {
      state.isLoading = false
    }),
    builder.addCase(fetchSchedules.fulfilled, (state, action) => {
      state.schedules = action.payload;
    });
  },
});

// export const {} = scheduleSlice.actions;
export default scheduleSlice.reducer;
