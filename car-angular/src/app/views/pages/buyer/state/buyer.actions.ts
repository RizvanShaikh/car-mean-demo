import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum BuyerActionTypes {

    UPDATE_STATUS = "[BUYER] Update Status",
    UPDATE_STATUS_SUCCESS = "[BUYER]  Update Status Success",
    UPDATE_STATUS_FAIL = "[BUYER]  Update Status Fail",

    LOAD_BUYER = "[BUYER] Load BUYER",
    LOAD_BUYER_SUCCESS = "[BUYER] Load BUYER Success",
    LOAD_BUYER_FAIL = "[BUYER] Load BUYER Fail",

    UPDATE_BUYER = "[BUYER] Update BUYER",
    UPDATE_BUYER_SUCCESS = "[BUYER] Update BUYER Success",
    UPDATE_BUYER_FAIL = "[BUYER] Update BUYER Fail",

    DELETE_BUYER = "[BUYER] Delete BUYER",
    DELETE_BUYER_SUCCESS = "[BUYER] Delete BUYER Success",
    DELETE_BUYER_FAIL = "[BUYER] Delete BUYER Fail",

    ADD_BUYER = "[BUYER] Upload Data",
    ADD_BUYER_SUCCESS = "[BUYER] Upload Data Success",
    ADD_BUYER_FAIL = "[BUYER] Upload Data Fail",

    UPLOAD_DATA = "[BUYER] Upload Data",
    UPLOAD_DATA_SUCCESS = "[BUYER] Upload Data Success",
    UPLOAD_DATA_FAIL = "[BUYER] Upload Data Fail",
}

export class LoadBuyer implements Action {
    readonly type = BuyerActionTypes.LOAD_BUYER;

    constructor(public payload: any) { }
}

export class LoadBuyerSuccess implements Action {
    readonly type = BuyerActionTypes.LOAD_BUYER_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadBuyerFail implements Action {
    readonly type = BuyerActionTypes.LOAD_BUYER_FAIL;

    constructor(public payload: any) { }
}

export class UpdateBuyer implements Action {
    readonly type = BuyerActionTypes.UPDATE_BUYER

    constructor(public payload: any) { }
}

export class UpdateBuyerSuccess implements Action {
    readonly type = BuyerActionTypes.UPDATE_BUYER_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateBuyerFail implements Action {
    readonly type = BuyerActionTypes.UPDATE_BUYER_FAIL;

    constructor(public payload: any) { }
}

export class DeleteBuyer implements Action {
    readonly type = BuyerActionTypes.DELETE_BUYER;

    constructor(public payload: any) { }
}

export class DeleteBuyerSuccess implements Action {
    readonly type = BuyerActionTypes.DELETE_BUYER_SUCCESS;

    constructor(public payload: Response) { }
}

export class DeleteBuyerFail implements Action {
    readonly type = BuyerActionTypes.DELETE_BUYER_FAIL;

    constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
    readonly type = BuyerActionTypes.UPDATE_STATUS;

    constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
    readonly type = BuyerActionTypes.UPDATE_STATUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
    readonly type = BuyerActionTypes.UPDATE_STATUS_FAIL;

    constructor(public payload: any) { }
}


export class AddBuyer implements Action {
    readonly type = BuyerActionTypes.ADD_BUYER;

    constructor(public payload: any) { }
}

export class AddBuyerSuccess implements Action {
    readonly type = BuyerActionTypes.ADD_BUYER_SUCCESS;

    constructor(public payload: Response) { }
}

export class AddBuyerFail implements Action {
    readonly type = BuyerActionTypes.ADD_BUYER_FAIL;

    constructor(public payload: any) { }
}


export type action =
    | LoadBuyer
    | LoadBuyerSuccess
    | LoadBuyerFail
    | UpdateBuyer
    | UpdateBuyerSuccess
    | UpdateBuyerFail
    | DeleteBuyer
    | DeleteBuyerSuccess
    | DeleteBuyerFail
    | UpdateStatus
    | UpdateStatusSuccess
    | UpdateStatusFail
    | AddBuyer
    | AddBuyerSuccess
    | AddBuyerFail

