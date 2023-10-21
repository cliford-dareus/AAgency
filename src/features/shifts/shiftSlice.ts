import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Shifts } from "../../utils/type";

export const fetchShifts = createAsyncThunk(
  "shift/fetch",
  async (unitId: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/shift/${unitId}`);
    const result = res.json();
    return result;
  }
);

export const addShifts = createAsyncThunk(
  "shift/add",
  async (
    shift: { id: string; name: string; time: string; unitId: string },
    thunkApi
  ) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/shift`, {
        method: "POST",
        body: JSON.stringify(shift),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      return thunkApi.fulfillWithValue(result);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface ShiftState {
  shifts: Shifts[];
  isLoading: boolean;
}

const initialState = {
  shifts: [],
  isLoading: true,
} as ShiftState;

const scheduleSlice = createSlice({
  name: "shifts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShifts.pending, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchShifts.fulfilled, (state, action) => {
        state.shifts = action.payload;
    })
    .addCase(addShifts.fulfilled, (state, action) => {
        state.shifts = [...state.shifts, action.payload]
    })
  },
});

// export const {} = scheduleSlice.actions;
export default scheduleSlice.reducer;
