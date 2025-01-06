import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import ill from "./ill/reducer";
import mpls from "./mpls/reducer";
import create from "./create";

const connection = combineReducers({
    page,
    create,
    ill,
    mpls
})

export default connection;