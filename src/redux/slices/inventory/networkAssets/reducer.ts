import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import deleteState from "./delete";
import list from "./list";
import router from "./router";
import switchState from "./switch"

const networkAssets = combineReducers({
    page,
    create,
    update,
    delete: deleteState,
    list,
    router,
    switch: switchState
})

export default networkAssets;