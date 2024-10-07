import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import page from "./page";

const networkDeviceManufacturer = combineReducers({
    create,
    page,
})

export default networkDeviceManufacturer;