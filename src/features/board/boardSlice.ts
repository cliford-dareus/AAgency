import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../utils/type";
import { updateUnitFetch } from "../units/unitSlice";
import { API_URL } from "@/utils/common";

export const fetchBoard = createAsyncThunk("board/fetch", async () => {
  const res = await fetch(`${API_URL}/board`);
  const result = res.json();
  return result;
});

export const updateBoard = createAsyncThunk(
  "board/update",
  async ({ id, newName }: { id: string; newName: string }, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/board`, {
        method: "PUT",
        body: JSON.stringify({ id: id, newName: newName }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "board/delete",
  async (id: string, thunkApi) => {
    try {
      const res = await fetch(`${API_URL}/board/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface boardState {
  board: Board[];
  Loading: boolean;
}

const initialState = {
  board: [],
  Loading: true,
} as boardState;

const boardSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.Loading = false;
      })
      .addCase(updateUnitFetch.fulfilled, (state, action) => {
        if (action.payload.name) {
          const stateToUp = state.board.filter(
            (board) => board.id !== action.payload.id
          );
          state.board = [...stateToUp, action.payload];
        }
      })
      .addCase(updateBoard.pending, (state) => {
        state.Loading = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.Loading = false;
        state.board = [...state.board, action.payload];
      });
  },
});

// export const {} = scheduleSlice.actions;
export default boardSlice.reducer;
