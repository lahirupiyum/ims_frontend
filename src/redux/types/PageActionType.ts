import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { PageReponse } from "../actions/globalPageAction"

type PageSliceActionType <T> = {
    request: ActionCreatorWithPayload<{page:number, pageSize:number}, `${string}/request`>
    success: ActionCreatorWithPayload<PageReponse<T>, `${string}/success`>
    reject: ActionCreatorWithPayload<string, `${string}/reject`>
}

export default PageSliceActionType;