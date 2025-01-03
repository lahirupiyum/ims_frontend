import { createSlice } from "@reduxjs/toolkit";
import SidenavParent from "../../screens/management/sidenavConfig";
import inventorySidenav from "../../screens/management/inventory/inventorySidenav";
import customerSidenav from "../../screens/management/customer/customerSideNav";

const initialState: SidenavParent = null as unknown as SidenavParent;

export const sidenavSlice = createSlice({
    name:"sidenav",
    initialState,
    reducers: {
        inventory: (state) => state = inventorySidenav,
        customer: (state) => state = customerSidenav,
        reset: (state) => state = initialState
    }
})

export const { inventory, customer, reset } = sidenavSlice.actions;
export default sidenavSlice.reducer;