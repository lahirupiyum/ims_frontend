import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import deleteReducer from "./delete";
import list from "./list";

const networkDeviceManufacturer = combineReducers({
    page,
    create,
    update,
    delete: deleteReducer,
    list,
})

export default networkDeviceManufacturer;