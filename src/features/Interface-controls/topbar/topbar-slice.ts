import { addDateBy, getfirstDayOfWeek } from "@/utils/helpers";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
  expanded: boolean;
  viewSelected: "Today" | "Week" | "Month";
  firstDayOfWeek : Date
  currentDate: string;
};

const initialState = {
  expanded: false,
  viewSelected: "Today",
  firstDayOfWeek: getfirstDayOfWeek(),
  currentDate: String(new Date()),
} as InitialStateProps;

export const topbarSlice = createSlice({
  name: "topbar",
  initialState,
  reducers: {
    toggleTopbar: (state) => {
      state.expanded = !state.expanded;
    },
    toggleviewselected: (
      state: InitialStateProps,
      action: PayloadAction<"Today" | "Week" | "Month">
    ): void => {
      state.viewSelected = action.payload;
    },
    incrementDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    decrementDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    nextWeek: (state) => {
      state.firstDayOfWeek = addDateBy(state.firstDayOfWeek, 7);
    },
    prevWeek: (state) => {
      state.firstDayOfWeek = addDateBy(state.firstDayOfWeek, -7);
    },
  },
});

export const {
  toggleTopbar,
  toggleviewselected,
  decrementDate,
  incrementDate,
  prevWeek,
  nextWeek
} = topbarSlice.actions;
export default topbarSlice.reducer;

