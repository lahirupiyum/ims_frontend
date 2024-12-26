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
import customer from "../slices/customer/customer/reducer";
import cusRouter from "../slices/customer/cusrouter/reducer";

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
  customer,
  cusRouter
});

export default allReducers;
