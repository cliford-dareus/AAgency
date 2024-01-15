import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Employee, EmployeePayload } from "../../utils/type";
import { API_URL } from "@/utils/common";

export const fetchEmployee = createAsyncThunk("schedules/fetch", async () => {
  const res = await fetch("http://localhost:3000/api/v1/schedule");
  const result = res.json();
  return result;
});

export const addEmployeeToShift = createAsyncThunk(
  "employee/add",
  async ({ userId, shiftId, scheduleId }: EmployeePayload, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/employee`, {
        method: "POST",
        body: JSON.stringify({ userId, shiftId, scheduleId }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

// export const removeEmployeeFromShift = createAsyncThunk(
//   "employee/remove",
//   async ({ employeeId }) => {}
// );

interface EmployeeState {
  employee: Employee[];
  isLoading: boolean;
}

const initialState = {
  employee: [],
  isLoading: true,
} as EmployeeState;

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.isLoading = false;
    }),
      builder.addCase(fetchEmployee.fulfilled, (state, action) => {
        state.employee = action.payload;
      });
  },
});

// export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
