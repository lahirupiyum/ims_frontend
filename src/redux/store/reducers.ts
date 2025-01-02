import { combineReducers } from "@reduxjs/toolkit";
import branch from "../slices/branch/reducer";
import networkDevice from "../slices/network/device/reducer";
import networkDeviceManufacturer from "../slices/network/manufacturer/reducer";
import networkDeviceModel from "../slices/network/model/reducer";
import networkDeviceStatus from "../slices/network/status/reducer";
import networkDeviceType from "../slices/network/type/reducer";
import notification from "../slices/notificationSlice";
import sidenav from "../slices/sidenavSlice";
import vendor from "../slices/vendor/reducer";
import networkAssets from "../slices/networkAssets/reducer";

const allReducers = combineReducers({
  sidenav,
  notification,
  networkDevice,
  networkDeviceManufacturer,
  networkDeviceType,
  networkDeviceModel,
  networkDeviceStatus,
  vendor,
  branch,
  networkAssets,
});

export default allReducers;
