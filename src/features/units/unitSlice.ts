import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Units } from "../../utils/type";

export const fetchUnit = createAsyncThunk(
  "unit/fetch",
  async ({scheduleId, boardName}: {scheduleId: string, boardName: string}) => {
    const res = await fetch(`http://localhost:3000/api/v1/unit?boardname=${boardName}&sch_id=${scheduleId}`);
    const result = await res.json();
    return result;
  }
);

export const addUnitFetch = createAsyncThunk(
  "unit/add",
  async (
    unit: { boardName: string; lead: string; scheduleDate: string, description: string},
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
  unit: Units[];
}

const initialState = {
  unit: [],
} as UnitState;

const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnit.fulfilled, (state, action) => {
        console.log(action.payload)
        state.unit = action.payload;
      })
      .addCase(addUnitFetch.fulfilled, (state, action) => {
        state.unit = action.payload;
      });
  },
});

// export const {} = unitSlice.actions;
export default unitSlice.reducer;
