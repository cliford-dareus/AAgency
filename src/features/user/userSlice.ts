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
  loading: boolean;
}

const initialState = {
  user: [],
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
    //   .addCase(addUnitFetch.fulfilled, (state, action) => {
    //     state.unit = [...state.unit, action.payload];
    //   })
    //   .addCase(updateUnitFetch.fulfilled, (state, action) => {
    //     if (action.payload.lead) {
    //       state.unit[0].lead = action.payload.lead;
    //     }
    //   });
  },
});

// export const {} = unitSlice.actions;
export default unitSlice.reducer;
