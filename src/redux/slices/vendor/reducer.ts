import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import deleteState from "./delete";

const vendor = combineReducers({
    page,
    create,
    update,
    delete: deleteState
})

export default vendor;