import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import deleteState from "./delete";
import page from "./page";
import update from "./update";

const branch = combineReducers({
  page,
  create,
  update,
  delete: deleteState,
});

export default branch;
