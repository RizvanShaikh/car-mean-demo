import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

// import { StudentManagementService } from "../student-management.service";
import * as cmsActions from "./cms.actions";
import { Response } from "../../../../model/model";
import { CmsManagementService } from '../cms-management.service';


@Injectable()
export class CMSEffect {

    constructor(
        private actions$: Actions,
        private cmsService: CmsManagementService
    ) { }

    @Effect()
    deleteCMS$: Observable<Action> = this.actions$.pipe(
        ofType<cmsActions.DeleteCMS>(
            cmsActions.CMSActionTypes.DELETE_CMS
        ),
        map((action: cmsActions.DeleteCMS) => action.payload),
        mergeMap((id: any) =>
            this.cmsService.deleteCMSById(id).pipe(
                map(
                    (response: Response) =>
                        new cmsActions.DeleteCMSSuccess(response)
                ),
                catchError(err =>
                    of(new cmsActions.DeleteCMSFail(err)))
            )
        )
    );


    @Effect()
    updateStatus$: Observable<Action> = this.actions$.pipe(
        ofType<cmsActions.UpdateStatus>(
            cmsActions.CMSActionTypes.UPDATE_STATUS
        ),
        map((action: cmsActions.UpdateStatus) => action.payload),
        mergeMap((data: any) =>
            this.cmsService.updateStatus(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new cmsActions.UpdateStatusSuccess(updateCustomer)
                ),
                catchError(err => of(new cmsActions.UpdateStatusFail(err)))
            )
        )
    );

    @Effect()
    loadCMS$: Observable<Action> = this.actions$.pipe(
        ofType<cmsActions.LoadCMS>(
            cmsActions.CMSActionTypes.LOAD_CMS
        ),
        map((action: cmsActions.LoadCMS) => action.payload),
        mergeMap((id: any) =>
            this.cmsService.getCMSById(id).pipe(
                map(
                    (response: Response) =>
                        new cmsActions.LoadCMSSuccess(response)
                ),
                catchError(err =>
                    of(new cmsActions.LoadCMSFail(err)))
            )
        )
    );

    @Effect()
    updateCMS$: Observable<Action> = this.actions$.pipe(
        ofType<cmsActions.UpdateCMS>(
            cmsActions.CMSActionTypes.UPDATE_CMS
        ),
        map((action: cmsActions.UpdateCMS) => action.payload),
        mergeMap((data: any) =>
            this.cmsService.updateCMS(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new cmsActions.UpdateCMSSuccess(updateCustomer)
                ),
                catchError(err => of(new cmsActions.UpdateCMSFail(err)))
            )
        )
    );


    @Effect()
    addCMS$: Observable<Action> = this.actions$.pipe(
        ofType<cmsActions.AddCMS>(
            cmsActions.CMSActionTypes.ADD_CMS
        ),
        map((action: cmsActions.AddCMS) => action.payload),
        mergeMap((data: any) =>
            this.cmsService.addCMS(data).pipe(
                map(
                    (newAdmin: Response) =>
                        new cmsActions.AddCMSSuccess(newAdmin)
                ),
                catchError(err =>
                    of(new cmsActions.AddCMSFail(err)))
            )
        )
    );


}