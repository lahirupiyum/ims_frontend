import { combineReducers } from "@reduxjs/toolkit";
import list from  "./list";

const lastMileProvider = combineReducers({
    list
});

export default lastMileProvider;