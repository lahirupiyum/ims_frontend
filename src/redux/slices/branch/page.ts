import { BranchResponse } from "../../../types/Branch";
import { branchUrl } from "../../../utils/url-properties/urls/branch";
import globalPageAction from "../../actions/globalPageAction";
import PageSliceActionType from "../../types/PageActionType";
import getPageSlice from "../config/globalPageSlice";

const branchPageSlice = getPageSlice<BranchResponse>("branchPage");

const { request, success, reject } = branchPageSlice.actions;

const pageActionTypes: PageSliceActionType<BranchResponse> = {
  request,
  success,
  reject,
};

export const branchPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, branchUrl, pageActionTypes);


export const { reset: branchPageReset, create: branchAddOnetoList } = branchPageSlice.actions;
export default branchPageSlice.reducer;