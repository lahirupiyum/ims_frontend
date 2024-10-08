import { combineReducers } from "@reduxjs/toolkit";
import networkDevice from "../slices/network/device/reducer";
import networkDeviceManufacturer from "../slices/network/manufacturer/reducer";
import networkDeviceModel from "../slices/network/model/reducer";
import networkDeviceType from "../slices/network/type/reducer";
import sidenav from "../slices/sidenavSlice";

const allReducers = combineReducers({
  sidenav,
  networkDevice,
  networkDeviceManufacturer,
  networkDeviceType,
  networkDeviceModel,
});

export default allReducers;
