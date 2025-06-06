import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";
import update from "./update"

const cusRouter = combineReducers({
    page,
    create,
    update
})

export default cusRouter;