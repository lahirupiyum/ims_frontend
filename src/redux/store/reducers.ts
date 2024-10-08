import { combineReducers } from "@reduxjs/toolkit";
import networkDeviceManufacturer from "../slices/network/manufacturer/reducer";
import networkDeviceModel from "../slices/network/model/reducer";
import networkDeviceType from "../slices/network/type/reducer";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
  sidenav,
  networkDeviceManufacturer,
  networkDeviceType,
  networkDeviceModel,
});

export default allReducers;
