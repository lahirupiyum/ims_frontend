import { Employee } from "../../../../types/Inventory/Employee";
import {
  employeeListUrl,
  employeeSearchUrl,
} from "../../../../utils/url-properties/urls/inventory/employee";
import globalListAction from "../../../actions/globalListAction";
import globalSearchAction from "../../../actions/globalSearchAction";
import ListSliceActionType from "../../../types/ListActionType";
import getListSlice from "../../config/globalListSlice";

const employeeListSlice = getListSlice<Employee>("employeeList");

const { request, success, reject } = employeeListSlice.actions;

const listActionTypes: ListSliceActionType<Employee> = {
  request,
  success,
  reject,
};

export const employeeSearchAction = (name: string) =>
  globalSearchAction<Employee>(name, employeeSearchUrl, listActionTypes);

export const employeeListAction = () =>
  globalListAction<Employee>(employeeListUrl, listActionTypes);

export const { reset: employeeResetAction } = employeeListSlice.actions;

export default employeeListSlice.reducer;
