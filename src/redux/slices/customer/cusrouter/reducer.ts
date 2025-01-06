import { combineReducers } from "@reduxjs/toolkit";
import page from "./page";
import create from "./create";

const cusRouter = combineReducers({
    page,
    create
})

export default cusRouter;