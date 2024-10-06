import { combineReducers } from "@reduxjs/toolkit";
import networkDevicePage from "../slices/network/device/page";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
  sidenav,
  networkDevicePage,
});

export default allReducers;
