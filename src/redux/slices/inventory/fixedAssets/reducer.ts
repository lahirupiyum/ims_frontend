import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update";
import deleteState from "./delete";
import list from "./list";

const fixedAssets = combineReducers({
    page,
    create,
    update,
    delete: deleteState,
    list,
})

export default fixedAssets;