import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import deleteReducer from "./delete"

const networkDevice = combineReducers({
    page,
    create,
    update,
    delete: deleteReducer
})

export default networkDevice;