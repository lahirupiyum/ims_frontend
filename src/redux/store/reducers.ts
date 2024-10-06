import { combineReducers } from "@reduxjs/toolkit";
import networkDevicePage from "../slices/network/device/page";
import networkDeviceCreate from "../slices/network/device/create";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
  sidenav,
  networkDevicePage,
  networkDeviceCreate,
});

export default allReducers;
