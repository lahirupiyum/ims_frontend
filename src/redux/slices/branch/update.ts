import { BranchRequest, BranchResponse } from "../../../types/Branch";
import { branchWithIdUrl } from "../../../utils/url-properties/urls/branch";
import globalUpdateAction from "../../actions/globalUpdateAction";
import UpdateSliceActionType from "../../types/UpdateActionType";
import getUpdateSlice from "../config/globalUpdateSlice";
import { branchUpdateOneInList } from "./page";

const branchUpdateSlice = getUpdateSlice<BranchResponse>("branchUpdate");
const { request, success, reject } = branchUpdateSlice.actions;

const updateActionTypes: UpdateSliceActionType<BranchResponse> = {
  request,
  success,
  reject,
  updateOneInList: branchUpdateOneInList,
};

export const branchUpdateAction = (
  id: number,
  data: BranchRequest,
  index: number
) =>
  globalUpdateAction<BranchRequest, BranchResponse>(
    index,
    data,
    branchWithIdUrl(id),
    updateActionTypes
  );

export const { reset: branchUpdateReset } = branchUpdateSlice.actions;
export default branchUpdateSlice.reducer;
