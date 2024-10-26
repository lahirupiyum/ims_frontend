import { BranchResponse } from "../../../types/Branch";
import { branchListUrl } from "../../../utils/url-properties/urls/branch";
import globalListAction from "../../actions/globalListAction";
import ListSliceActionType from "../../types/ListActionType";
import getListSlice from "../config/globalListSlice";

const branchListSlice = getListSlice<BranchResponse>("branchList");
const { request, success, reject } = branchListSlice.actions;

const listActionTypes: ListSliceActionType<BranchResponse> = {
    request,
    success,
    reject
};

export const branchListAction = () => globalListAction(branchListUrl, listActionTypes);

export const { reset: branchListReset } = branchListSlice.actions;
export default branchListSlice.reducer;