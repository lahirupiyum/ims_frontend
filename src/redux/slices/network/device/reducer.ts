import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import page from "./page";

const networkDevice = combineReducers({
    page,
    create,
})

export default networkDevice;