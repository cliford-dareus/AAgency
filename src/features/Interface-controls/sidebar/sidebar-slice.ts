import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
    expanded: boolean,
    activeLink : string
};

const initialState = {
    expanded: true,
    activeLink : "dashboard"
} as InitialStateProps;

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.expanded = !state.expanded;
        },
        setActiveLink: (state, action) => {
            state.activeLink = action.payload
        }
    },
});

export const {toggleSidebar, setActiveLink} = sidebarSlice.actions
export default sidebarSlice.reducer