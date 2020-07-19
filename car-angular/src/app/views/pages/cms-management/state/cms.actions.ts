import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum CMSActionTypes {

    UPDATE_STATUS = "[CMS] Update Status",
    UPDATE_STATUS_SUCCESS = "[CMS]  Update Status Success",
    UPDATE_STATUS_FAIL = "[CMS]  Update Status Fail",

    LOAD_CMS = "[CMS] Load CMS",
    LOAD_CMS_SUCCESS = "[CMS] Load CMS Success",
    LOAD_CMS_FAIL = "[CMS] Load CMS Fail",

    UPDATE_CMS = "[CMS] Update CMS",
    UPDATE_CMS_SUCCESS = "[CMS] Update CMS Success",
    UPDATE_CMS_FAIL = "[CMS] Update CMS Fail",

    DELETE_CMS = "[CMS] Delete CMS",
    DELETE_CMS_SUCCESS = "[CMS] Delete CMS Success",
    DELETE_CMS_FAIL = "[CMS] Delete CMS Fail",

   ADD_CMS = "[CMS] Upload Data",
   ADD_CMS_SUCCESS = "[CMS] Upload Data Success",
   ADD_CMS_FAIL = "[CMS] Upload Data Fail",
}

export class LoadCMS implements Action {
    readonly type = CMSActionTypes.LOAD_CMS;

    constructor(public payload: any) { }
}

export class LoadCMSSuccess implements Action {
    readonly type = CMSActionTypes.LOAD_CMS_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadCMSFail implements Action {
    readonly type = CMSActionTypes.LOAD_CMS_FAIL;

    constructor(public payload: any) { }
}

export class UpdateCMS implements Action {
    readonly type = CMSActionTypes.UPDATE_CMS;

    constructor(public payload: any) { }
}

export class UpdateCMSSuccess implements Action {
    readonly type = CMSActionTypes.UPDATE_CMS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateCMSFail implements Action {
    readonly type = CMSActionTypes.UPDATE_CMS_FAIL;

    constructor(public payload: any) { }
}

export class DeleteCMS implements Action {
    readonly type = CMSActionTypes.DELETE_CMS;

    constructor(public payload: any) { }
}

export class DeleteCMSSuccess implements Action {
    readonly type = CMSActionTypes.DELETE_CMS_SUCCESS;

    constructor(public payload: Response) { }
}

export class DeleteCMSFail implements Action {
    readonly type = CMSActionTypes.DELETE_CMS_FAIL;

    constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
    readonly type = CMSActionTypes.UPDATE_STATUS;

    constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
    readonly type = CMSActionTypes.UPDATE_STATUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
    readonly type = CMSActionTypes.UPDATE_STATUS_FAIL;

    constructor(public payload: any) { }
}


export class AddCMS implements Action {
    readonly type = CMSActionTypes.ADD_CMS;

    constructor(public payload: any) { }
}

export class AddCMSSuccess implements Action {
    readonly type = CMSActionTypes.ADD_CMS_SUCCESS;

    constructor(public payload: Response) { }
}

export class AddCMSFail implements Action {
    readonly type = CMSActionTypes.ADD_CMS_FAIL;

    constructor(public payload: any) { }
}


export type action =
    | LoadCMS
    | LoadCMSSuccess
    | LoadCMSFail
    | UpdateCMS
    | UpdateCMSSuccess
    | UpdateCMSFail
    | DeleteCMS
    | DeleteCMSSuccess
    | DeleteCMSFail
    | UpdateStatus
    | UpdateStatusSuccess
    | UpdateStatusFail
    | AddCMS
    | AddCMSSuccess
    | AddCMSFail
