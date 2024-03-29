import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
    expanded: boolean
};

const initialState = {
    expanded: false
} as InitialStateProps;

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.expanded = !state.expanded;
        },
    },
});

export const {toggleSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer