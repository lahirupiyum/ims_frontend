import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import page from "./page";
import update from "./update";

const branch = combineReducers({
  page,
  create,
  update,
});

export default branch;
