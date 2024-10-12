import { BranchRequest, BranchResponse } from "../../../types/Branch";
import { branchUrl } from "../../../utils/url-properties/urls/branch";
import globalCreateAction from "../../actions/globalCreateAction";
import CreateSliceActionType from "../../types/CreateActionType";
import getCreateSlice from "../config/globalCreateSlice";
import { branchAddOnetoList } from "./page";

const branchCreateSlice = getCreateSlice<BranchResponse>("branchCreate");

const { request, success, reject } = branchCreateSlice.actions;

const createActionTypes: CreateSliceActionType<BranchResponse> = {
  request,
  success,
  reject,
  addOnetoList: branchAddOnetoList
};

export const branchCreateAction = (data: BranchRequest) =>
  globalCreateAction<BranchRequest, BranchResponse>(
    data,
    branchUrl,
    createActionTypes
  );
export const { reset: branchCreateReset } = branchCreateSlice.actions;
export default branchCreateSlice.reducer;
