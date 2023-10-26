import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Units } from "../../utils/type";
import { API_URL } from "@/utils/common";

export const fetchUnit = createAsyncThunk(
  "unit/fetch",
  async ({
    scheduleId,
    boardName,
  }: {
    scheduleId: string;
    boardName: string;
  }) => {
    const res = await fetch(
      `${API_URL}/unit?boardname=${boardName}&sch_id=${scheduleId}`
    );
    const result = await res.json();
    return result;
  }
);

export const addUnitFetch = createAsyncThunk(
  "unit/add",
  async (
    unit: {
      boardName: string;
      lead: string;
      scheduleDate: string;
      description: string;
    },
    thunkApi
  ) => {
    thunkApi;
    try {
      const res = await fetch(`${API_URL}/unit`, {
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

export const updateUnitFetch = createAsyncThunk(
  "unit/update",
  async (
    input: {
      newLead: string;
      newUnitName: string;
      sch_id: string;
      boardname: string;
    },
    thunkApi
  ) => {
    try {
      const res = await fetch(`${API_URL}/unit`, {
        method: "PUT",
        body: JSON.stringify(input),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface UnitState {
  unit: Units[];
  loading: boolean;
}

const initialState = {
  unit: [],
  loading: false,
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
      })
      .addCase(updateUnitFetch.fulfilled, (state, action) => {
        if (action.payload.lead) {
          state.unit[0].lead = action.payload.lead;
        }
      });
  },
});

// export const {} = unitSlice.actions;
export default unitSlice.reducer;
