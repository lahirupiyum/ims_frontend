import { BranchResponse } from "../../../types/Branch";
import { branchUrl } from "../../../utils/url-properties/urls/branch";
import globalPageAction, { PageReponse } from "../../actions/globalPageAction";
import SliceActionType from "../../actions/sliceActionType";
import getPageSlice from "../config/globalPageSlice";

const branchPageSlice = getPageSlice<BranchResponse>("branchPage");

const { request, success, reject } = branchPageSlice.actions;

const pageActionTypes: SliceActionType<PageReponse<BranchResponse>> = {
  request,
  success,
  reject,
};

export const branchPageAction = (page: number, pageSize: number) =>
  globalPageAction(page, pageSize, branchUrl, pageActionTypes);


export const { reset: branchPageReset } = branchPageSlice.actions;
export default branchPageSlice.reducer;