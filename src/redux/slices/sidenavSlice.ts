import { createSlice } from "@reduxjs/toolkit";
import SidenavParent from "../../screens/management/sidenavConfig";
import inventorySidenav from "../../screens/management/inventory/inventorySidenav";

const initialState: SidenavParent = null as unknown as SidenavParent;

export const sidenavSlice = createSlice({
    name:"sidenav",
    initialState,
    reducers: {
        inventory: (state) => state = inventorySidenav,
        reset: (state) => state = initialState
    }
})

export const { inventory, reset } = sidenavSlice.actions;
export default sidenavSlice.reducer;