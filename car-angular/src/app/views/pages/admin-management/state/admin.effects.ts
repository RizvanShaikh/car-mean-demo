import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { AdminManagementService } from "../admin-management.service";
import * as adminActions from "./admin.actions";
import { Response } from "../../../../model/model";

@Injectable()
export class AdminEffect {
    constructor(
        private actions$: Actions,
        private adminService: AdminManagementService
    ) { }

    @Effect()
    uploadData$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.UploadData>(
            adminActions.AdminActionTypes.UPLOAD_DATA
        ),
        map((action: adminActions.UploadData) => action.payload),
        mergeMap((data: any) =>
            this.adminService.uploadData(data.updType, data.updDocs).pipe(
                map(
                    (updateAdmin: Response) =>
                        new adminActions.UploadDataSuccess(updateAdmin)
                ),
                catchError(err => of(new adminActions.UploadDataFail(err)))
            )
        )
    );


    @Effect()
    loadAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.LoadAdmin>(
            adminActions.AdminActionTypes.LOAD_ADMIN
        ),
        mergeMap((action: adminActions.LoadAdmin) =>
            this.adminService.getAdminById(action.payload).pipe(
                map(
                    (admin: Response) =>
                        new adminActions.LoadAdminSuccess(admin)
                ),
                catchError(err => of(new adminActions.LoadAdminFail(err)))
            )
        )
    );

    @Effect()
    createAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.CreateAdmin>(
            adminActions.AdminActionTypes.CREATE_ADMIN
        ),
        map((action: adminActions.CreateAdmin) => action.payload),
        mergeMap((admin: any) =>
            this.adminService.addAdmin(admin).pipe(
                map(
                    (newAdmin: Response) =>
                        new adminActions.CreateAdminSuccess(newAdmin)
                ),
                catchError(err =>
                    of(new adminActions.CreateAdminFail(err)))
            )
        )
    );

    @Effect()
    updateAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.UpdateAdmin>(
            adminActions.AdminActionTypes.UPDATE_ADMIN
        ),
        map((action: adminActions.UpdateAdmin) => action.payload),
        mergeMap((admin: any) =>
            this.adminService.updateAdmin(admin.id, admin.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new adminActions.UpdateAdminSuccess(updateCustomer)
                ),
                catchError(err => of(new adminActions.UpdateAdminFail(err)))
            )
        )
    );

    @Effect()
    deleteAdmin$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.DeleteAdmin>(
            adminActions.AdminActionTypes.DELETE_ADMIN
        ),
        map((action: adminActions.DeleteAdmin) => action.payload),
        mergeMap((id: any) =>
            this.adminService.deleteAdminById(id).pipe(
                map(
                    (response: Response) =>
                        new adminActions.DeleteAdminSuccess(response)
                ),
                catchError(err =>
                    of(new adminActions.DeleteAdminFail(err)))
            )
        )
    );


    @Effect()
    updateStatus$: Observable<Action> = this.actions$.pipe(
        ofType<adminActions.UpdateStatus>(
            adminActions.AdminActionTypes.UPDATE_STATUS
        ),
        map((action: adminActions.UpdateStatus) => action.payload),
        mergeMap((admin: any) =>
            this.adminService.updateStatus(admin.id, admin.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new adminActions.UpdateStatusSuccess(updateCustomer)
                ),
                catchError(err => of(new adminActions.UpdateStatusFail(err)))
            )
        )
    );

}
