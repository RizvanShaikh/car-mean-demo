import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as templateActions from "./template.actions";
import { Response } from "../../../../model/model";
import { TemplateService } from '../template.service';


@Injectable()
export class TemplateEffect {

    constructor(
        private actions$: Actions,
        private templateService: TemplateService
    ) { }

    // @Effect()
    // deleteTemplate$: Observable<Action> = this.actions$.pipe(
    //     ofType<templateActions.DeleteTemplate>(
    //         templateActions.TemplateActionTypes.DELETE_TEMPLATE
    //     ),
    //     map((action: templateActions.DeleteTemplate) => action.payload),
    //     mergeMap((id: any) =>
    //         this.templateService.deleteTemplateById(id).pipe(
    //             map(
    //                 (response: Response) =>
    //                     new templateActions.DeleteTemplateSuccess(response)
    //             ),
    //             catchError(err =>
    //                 of(new templateActions.DeleteTemplateFail(err)))
    //         )
    //     )
    // );


    // @Effect()
    // updateStatus$: Observable<Action> = this.actions$.pipe(
    //     ofType<templateActions.UpdateStatus>(
    //         templateActions.TemplateActionTypes.UPDATE_STATUS
    //     ),
    //     map((action: templateActions.UpdateStatus) => action.payload),
    //     mergeMap((data: any) =>
    //         this.templateService.updateStatus(data.id, data.data).pipe(
    //             map(
    //                 (updateCustomer: Response) =>
    //                     new templateActions.UpdateStatusSuccess(updateCustomer)
    //             ),
    //             catchError(err => of(new templateActions.UpdateStatusFail(err)))
    //         )
    //     )
    // );

    // @Effect()
    // loadTemplate$: Observable<Action> = this.actions$.pipe(
    //     ofType<templateActions.LoadTemplate>(
    //         templateActions.TemplateActionTypes.LOAD_TEMPLATE
    //     ),
    //     map((action: templateActions.LoadTemplate) => action.payload),
    //     mergeMap((id: any) =>
    //         this.templateService.getTemplateById(id).pipe(
    //             map(
    //                 (response: Response) =>
    //                     new templateActions.LoadTemplateSuccess(response)
    //             ),
    //             catchError(err =>
    //                 of(new templateActions.LoadTemplateFail(err)))
    //         )
    //     )
    // );

    // @Effect()
    // updateTemplate$: Observable<Action> = this.actions$.pipe(
    //     ofType<templateActions.UpdateTemplate>(
    //         templateActions.TemplateActionTypes.UPDATE_TEMPLATE
    //     ),
    //     map((action: templateActions.UpdateTemplate) => action.payload),
    //     mergeMap((data: any) =>
    //         this.templateService.updateTemplate(data.id, data.data).pipe(
    //             map(
    //                 (updateCustomer: Response) =>
    //                     new templateActions.UpdateTemplateSuccess(updateCustomer)
    //             ),
    //             catchError(err => of(new templateActions.UpdateTemplateFail(err)))
    //         )
    //     )
    // );


    // @Effect()
    // addTemplate$: Observable<Action> = this.actions$.pipe(
    //     ofType<templateActions.AddTemplate>(
    //         templateActions.TemplateActionTypes.ADD_TEMPLATE
    //     ),
    //     map((action: templateActions.AddTemplate) => action.payload),
    //     mergeMap((data: any) =>
    //         this.templateService.addTemplate(data).pipe(
    //             map(
    //                 (newAdmin: Response) =>
    //                     new templateActions.AddTemplateSuccess(newAdmin)
    //             ),
    //             catchError(err =>
    //                 of(new templateActions.AddTemplateFail(err)))
    //         )
    //     )
    // );


}