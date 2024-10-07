import { combineReducers } from "@reduxjs/toolkit";
import networkDevice from "../slices/network/device/reducer";
import networkDeviceManufacturer from "../slices/network/manufacturer/reducer";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
  sidenav,
  networkDevice,
  networkDeviceManufacturer,
});

export default allReducers;
