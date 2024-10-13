import { BranchResponse } from "../../../types/Branch";
import { branchWithIdUrl } from "../../../utils/url-properties/urls/branch";
import globalDeleteAction from "../../actions/globalDeleteAction";
import DeleteSliceActionType from "../../types/DeleteActionType";
import getDeleteSlice from "../config/globalDeleteSlice";
import { branchPageAction } from "./page";

const branchDeleteSlice = getDeleteSlice<BranchResponse>("branchDelete");

const { request, success, reject } = branchDeleteSlice.actions;

const deleteActionTypes: DeleteSliceActionType<BranchResponse> = {
  request,
  success,
  reject,
};

export const branchDeleteAction = (id: number) =>
  globalDeleteAction(branchWithIdUrl(id), deleteActionTypes, branchPageAction);

export const { reset: branchDeleteReset } = branchDeleteSlice.actions;
export default branchDeleteSlice.reducer;
