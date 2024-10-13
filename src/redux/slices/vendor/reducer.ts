import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";

const vendor = combineReducers({
    page,
    create,
    update,
})

export default vendor;