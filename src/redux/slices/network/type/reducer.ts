import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import list from "./list";
import deleteReducer from "./delete";

const networkDeviceType = combineReducers({
    page,
    create,
    update,
    list,
    delete: deleteReducer
})

export default networkDeviceType;