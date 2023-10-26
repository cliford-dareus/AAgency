import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../utils/type";
import { updateUnitFetch } from "../units/unitSlice";

export const fetchBoard = createAsyncThunk("board/fetch", async () => {
  const res = await fetch("http://localhost:3000/api/v1/board");
  const result = res.json();
  return result;
});

interface boardState {
  board: Board[];
  isLoading: boolean;
}

const initialState = {
  board: [],
  isLoading: true,
} as boardState;

const boardSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUnitFetch.fulfilled, (state, action) => {
        if (action.payload.name) {
          const stateToUp = state.board.filter(
            (board) => board.id !== action.payload.id
          );
          state.board = [...stateToUp, action.payload];
        }
      });
  },
});

// export const {} = scheduleSlice.actions;
export default boardSlice.reducer;
