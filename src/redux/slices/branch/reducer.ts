import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";

const branch = combineReducers({
    page,
});

export default branch;