import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Units } from "../../utils/type";

export const fetchUnit = createAsyncThunk(
  "unit/fetch",
  async (name: string) => {
    const res = await fetch(`http://localhost:3000/api/v1/unit/${name}`);
    const result = res.json();
    return result;
  }
);

export const addUnitFetch = createAsyncThunk(
  "unit/add",
  async (
    unit: { id: string; name: string; lead: string; scheduleId: string },
    thunkApi,
  ) => {
    thunkApi
    try {
      const res = await fetch("http://localhost:3000/api/v1/unit", {
        method: "POST",
        body: JSON.stringify(unit),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      return thunkApi.fulfillWithValue(result);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface UnitState {
  unit: Units;
}

const initialState = {
  unit: {
    id: "",
    name: "",
    lead: "",
    shifts: [],
  },
} as UnitState;

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnit.fulfilled, (state, action) => {
        state.unit = action.payload;
      })
      .addCase(addUnitFetch.fulfilled, (state, action) => {
        state.unit = action.payload;
      });
  },
});

// export const {} = unitSlice.actions;
export default unitSlice.reducer;
