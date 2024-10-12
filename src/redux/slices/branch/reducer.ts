import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import page from "./page";

const branch = combineReducers({
  page,
  create,
});

export default branch;
