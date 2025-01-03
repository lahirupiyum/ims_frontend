import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import ill from "./ill/reducer";
import mpls from "./mpls/reducer";

const connection = combineReducers({
    page,
    ill,
    mpls
})

export default connection;