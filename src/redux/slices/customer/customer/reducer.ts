import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import list from "./list";
import create from "./create";

const customer = combineReducers({
    page,
    list,
    create,
});

export default customer;