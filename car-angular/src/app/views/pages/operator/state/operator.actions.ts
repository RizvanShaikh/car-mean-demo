import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum OperatorActionTypes {

    UPDATE_STATUS = "[OPERATOR] Update Status",
    UPDATE_STATUS_SUCCESS = "[OPERATOR]  Update Status Success",
    UPDATE_STATUS_FAIL = "[OPERATOR]  Update Status Fail",

    LOAD_OPERATOR = "[OPERATOR] Load OPERATOR",
    LOAD_OPERATOR_SUCCESS = "[OPERATOR] Load OPERATOR Success",
    LOAD_OPERATOR_FAIL = "[OPERATOR] Load OPERATOR Fail",

    UPDATE_OPERATOR = "[OPERATOR] Update OPERATOR",
    UPDATE_OPERATOR_SUCCESS = "[OPERATOR] Update OPERATOR Success",
    UPDATE_OPERATOR_FAIL = "[OPERATOR] Update OPERATOR Fail",

    DELETE_OPERATOR = "[OPERATOR] Delete OPERATOR",
    DELETE_OPERATOR_SUCCESS = "[OPERATOR] Delete OPERATOR Success",
    DELETE_OPERATOR_FAIL = "[OPERATOR] Delete OPERATOR Fail",

    ADD_OPERATOR = "[OPERATOR] Upload Data",
    ADD_OPERATOR_SUCCESS = "[OPERATOR] Upload Data Success",
    ADD_OPERATOR_FAIL = "[OPERATOR] Upload Data Fail",
}

export class LoadOperator implements Action {
    readonly type = OperatorActionTypes.LOAD_OPERATOR;

    constructor(public payload: any) { }
}

export class LoadOperatorSuccess implements Action {
    readonly type = OperatorActionTypes.LOAD_OPERATOR_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadOperatorFail implements Action {
    readonly type = OperatorActionTypes.LOAD_OPERATOR_FAIL;

    constructor(public payload: any) { }
}

export class UpdateOperator implements Action {
    readonly type = OperatorActionTypes.UPDATE_OPERATOR;

    constructor(public payload: any) { }
}

export class UpdateOperatorSuccess implements Action {
    readonly type = OperatorActionTypes.UPDATE_OPERATOR_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateOperatorFail implements Action {
    readonly type = OperatorActionTypes.UPDATE_OPERATOR_FAIL;

    constructor(public payload: any) { }
}

export class DeleteOperator implements Action {
    readonly type = OperatorActionTypes.DELETE_OPERATOR;

    constructor(public payload: any) { }
}

export class DeleteOperatorSuccess implements Action {
    readonly type = OperatorActionTypes.DELETE_OPERATOR_SUCCESS;

    constructor(public payload: Response) { }
}

export class DeleteOperatorFail implements Action {
    readonly type = OperatorActionTypes.DELETE_OPERATOR_FAIL;

    constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
    readonly type = OperatorActionTypes.UPDATE_STATUS;

    constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
    readonly type = OperatorActionTypes.UPDATE_STATUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
    readonly type = OperatorActionTypes.UPDATE_STATUS_FAIL;

    constructor(public payload: any) { }
}


export class AddOperator implements Action {
    readonly type = OperatorActionTypes.ADD_OPERATOR;

    constructor(public payload: any) { }
}

export class AddOperatorSuccess implements Action {
    readonly type = OperatorActionTypes.ADD_OPERATOR_SUCCESS;

    constructor(public payload: Response) { }
}

export class AddOperatorFail implements Action {
    readonly type = OperatorActionTypes.ADD_OPERATOR_FAIL;

    constructor(public payload: any) { }
}


export type action =
    | LoadOperator
    | LoadOperatorSuccess
    | LoadOperatorFail
    | UpdateOperator
    | UpdateOperatorSuccess
    | UpdateOperatorFail
    | DeleteOperator
    | DeleteOperatorSuccess
    | DeleteOperatorFail
    | UpdateStatus
    | UpdateStatusSuccess
    | UpdateStatusFail
    | AddOperator
    | AddOperatorSuccess
    | AddOperatorFail
