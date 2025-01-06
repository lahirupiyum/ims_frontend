import { combineReducers } from "@reduxjs/toolkit";
import list from "./list";

const employee = combineReducers({
    list
});

export default employee;