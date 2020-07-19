
import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum AdminActionTypes {

  UPDATE_STATUS = "[Admin] Update Status",
  UPDATE_STATUS_SUCCESS = "[Admin]  Update Status Success",
  UPDATE_STATUS_FAIL = "[Admin]  Update Status Fail",

  LOAD_ADMIN = "[Admin] Load Admin",
  LOAD_ADMIN_SUCCESS = "[Admin] Load Admin Success",
  LOAD_ADMIN_FAIL = "[Admin] Load Admin Fail",

  CREATE_ADMIN = "[Admin] Create Admin",
  CREATE_ADMIN_SUCCESS = "[Admin] Create Admin Success",
  CREATE_ADMIN_FAIL = "[Admin] Create Admin Fail",

  UPDATE_ADMIN = "[Admin] Update Admin",
  UPDATE_ADMIN_SUCCESS = "[Admin] Update Admin Success",
  UPDATE_ADMIN_FAIL = "[Admin] Update Admin Fail",

  DELETE_ADMIN = "[Admin] Delete Admin",
  DELETE_ADMIN_SUCCESS = "[Admin] Delete Admin Success",
  DELETE_ADMIN_FAIL = "[Admin] Delete Admin Fail",


  UPLOAD_DATA = "[Admin] Upload Data",
  UPLOAD_DATA_SUCCESS = "[Admin] Upload Data Success",
  UPLOAD_DATA_FAIL = "[Admin] Upload Data Fail",
  
}

export class LoadAdmin implements Action {
  readonly type = AdminActionTypes.LOAD_ADMIN;

  constructor(public payload: any) { }
}

export class LoadAdminSuccess implements Action {
  readonly type = AdminActionTypes.LOAD_ADMIN_SUCCESS;

  constructor(public payload: Response) { }
}

export class LoadAdminFail implements Action {
  readonly type = AdminActionTypes.LOAD_ADMIN_FAIL;

  constructor(public payload: any) { }
}

export class CreateAdmin implements Action {
  readonly type = AdminActionTypes.CREATE_ADMIN;

  constructor(public payload: any) { }
}

export class CreateAdminSuccess implements Action {
  readonly type = AdminActionTypes.CREATE_ADMIN_SUCCESS;

  constructor(public payload: Response) { }
}

export class CreateAdminFail implements Action {
  readonly type = AdminActionTypes.CREATE_ADMIN_FAIL;

  constructor(public payload: any) { }
}

export class UpdateAdmin implements Action {
  readonly type = AdminActionTypes.UPDATE_ADMIN;

  constructor(public payload: any) { }
}

export class UpdateAdminSuccess implements Action {
  readonly type = AdminActionTypes.UPDATE_ADMIN_SUCCESS;

  constructor(public payload: Response) { }
}

export class UpdateAdminFail implements Action {
  readonly type = AdminActionTypes.UPDATE_ADMIN_FAIL;

  constructor(public payload: any) { }
}

export class DeleteAdmin implements Action {
  readonly type = AdminActionTypes.DELETE_ADMIN;

  constructor(public payload: any) { }
}

export class DeleteAdminSuccess implements Action {
  readonly type = AdminActionTypes.DELETE_ADMIN_SUCCESS;

  constructor(public payload: Response) { }
}

export class DeleteAdminFail implements Action {
  readonly type = AdminActionTypes.DELETE_ADMIN_FAIL;

  constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
  readonly type = AdminActionTypes.UPDATE_STATUS;

  constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
  readonly type = AdminActionTypes.UPDATE_STATUS_SUCCESS;

  constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
  readonly type = AdminActionTypes.UPDATE_STATUS_FAIL;

  constructor(public payload: any) { }
}

export class UploadData implements Action {
  readonly type = AdminActionTypes.UPLOAD_DATA;

  constructor(public payload: any) { }
}

export class UploadDataSuccess implements Action {
  readonly type = AdminActionTypes.UPLOAD_DATA_SUCCESS;

  constructor(public payload: Response) { }
}

export class UploadDataFail implements Action {
  readonly type = AdminActionTypes.UPLOAD_DATA_FAIL;

  constructor(public payload: any) { }
}

export type action =

  | LoadAdmin
  | LoadAdminSuccess
  | LoadAdminFail
  | CreateAdmin
  | CreateAdminSuccess
  | CreateAdminFail
  | UpdateAdmin
  | UpdateAdminSuccess
  | UpdateAdminFail
  | DeleteAdmin
  | DeleteAdminSuccess
  | DeleteAdminFail
  | UpdateStatus
  | UpdateStatusSuccess
  | UpdateStatusFail
  | UploadData
  | UploadDataSuccess
  | UploadDataFail