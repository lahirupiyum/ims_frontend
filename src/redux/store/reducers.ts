import { combineReducers } from "@reduxjs/toolkit";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
    sidenav,
})

export default allReducers;