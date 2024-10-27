import { combineReducers } from "@reduxjs/toolkit";
import list from "./list";

const networkDeviceStatus = combineReducers({
    list
})

export default networkDeviceStatus;