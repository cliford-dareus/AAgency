import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
    isDragging: boolean;
    selectedtarget: HTMLDivElement | null;
};

const initialState = {
    isDragging: false,
    selectedtarget: null,
} as InitialStateProps;

export const dragSlice = createSlice({
    name: "drag",
    initialState,
    reducers: {
        toggleDrag: (state) => {
            state.isDragging = !state.isDragging;
        },
    },
});

export const { toggleDrag } = dragSlice.actions;
export default dragSlice.reducer