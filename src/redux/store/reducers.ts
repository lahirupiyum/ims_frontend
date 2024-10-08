import { combineReducers } from "@reduxjs/toolkit";
import networkDeviceManufacturer from "../slices/network/manufacturer/reducer";
import sidenav from "../slices/sidenavSlice";
import networkDeviceType from "../slices/network/type/reducer";

const allReducers = combineReducers({
  sidenav,
  networkDeviceManufacturer,
  networkDeviceType
});

export default allReducers;
