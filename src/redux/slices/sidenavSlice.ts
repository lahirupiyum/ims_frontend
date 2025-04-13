import { createSlice } from "@reduxjs/toolkit";
import SidenavParent from "../../screens/management/sidenavConfig";
import inventorySidenav from "../../screens/management/inventory/inventorySidenav";
import customerSidenav from "../../screens/management/customer/customerSideNav";

const initialState: SidenavParent = null as unknown as SidenavParent;

export const sidenavSlice = createSlice({
  name: "sidenav",
  initialState,
  reducers: {
    inventory: (state) => {
        state = inventorySidenav;
        return state;
    },
    customer: (state) => {
        state = customerSidenav
        return state;
    },
    reset: (state) => {
        state = initialState
        return state;
    },
  },
});

export const { inventory, customer, reset } = sidenavSlice.actions;
export default sidenavSlice.reducer;
