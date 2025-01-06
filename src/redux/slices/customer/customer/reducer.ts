import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import list from "./list";
import create from "./create";
import update from "./update";
import deleteReducer from "./delete";

const customer = combineReducers({
    page,
    list,
    create,
    update,
    delete: deleteReducer
});

export default customer;