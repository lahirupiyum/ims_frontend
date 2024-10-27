import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import list from "./list";

const networkDeviceManufacturer = combineReducers({
    page,
    create,
    update,
    list,
})

export default networkDeviceManufacturer;