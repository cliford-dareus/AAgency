import { API_URL } from "@/utils/common";
import { User } from "@/utils/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("user/fetch", async () => {
  const users = await fetch(`${API_URL}/user`);
  const result = await users.json();
  return result;
});

interface UnitState {
  user: User[];
  role: "employee" | "admin" | "manager";
  loading: boolean;
}

const initialState = {
  user: [],
  role: "employee",
  loading: false,
} as UnitState;

const unitSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

// export const {} = unitSlice.actions;
export default unitSlice.reducer;
