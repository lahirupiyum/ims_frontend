import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import list from "./list";

const manufacturer = combineReducers({
    page,
    list
})

export default manufacturer