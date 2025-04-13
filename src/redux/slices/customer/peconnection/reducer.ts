import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import update from "./update"

const peConnection = combineReducers({
    create,
    update
})

export default peConnection;