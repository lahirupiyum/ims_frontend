import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import ill from "./ill/reducer";
import mpls from "./mpls/reducer";
import create from "./create";
import view from "./view";
import update from "./update";
import terminateAndActivate from "./terminate";

const connection = combineReducers({
    page,
    create,
    view,
    ill,
    mpls,
    update,
    terminateAndActivate,
})

export default connection;