import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

// import { StudentManagementService } from "../student-management.service";
import * as operatorActions from "./operator.actions";
import { Response } from "../../../../model/model";
import { OperatorService } from '../operator.service';


@Injectable()
export class OperatorEffect {

    constructor(
        private actions$: Actions,
        private operatorService: OperatorService
    ) { }

    // @Effect()
    // deleteOperator$: Observable<Action> = this.actions$.pipe(
    //     ofType<operatorActions.DeleteOperator>(
    //         operatorActions.OperatorActionTypes.DELETE_OPERATOR
    //     ),
    //     map((action: operatorActions.DeleteOperator) => action.payload),
    //     mergeMap((id: any) =>
    //         this.operatorService.deleteOperatorById(id).pipe(
    //             map(
    //                 (response: Response) =>
    //                     new operatorActions.DeleteOperatorSuccess(response)
    //             ),
    //             catchError(err =>
    //                 of(new operatorActions.DeleteOperatorFail(err)))
    //         )
    //     )
    // );


    // @Effect()
    // updateStatus$: Observable<Action> = this.actions$.pipe(
    //     ofType<operatorActions.UpdateStatus>(
    //         operatorActions.OperatorActionTypes.UPDATE_STATUS
    //     ),
    //     map((action: operatorActions.UpdateStatus) => action.payload),
    //     mergeMap((data: any) =>
    //         this.operatorService.updateStatus(data.id, data.data).pipe(
    //             map(
    //                 (updateCustomer: Response) =>
    //                     new operatorActions.UpdateStatusSuccess(updateCustomer)
    //             ),
    //             catchError(err => of(new operatorActions.UpdateStatusFail(err)))
    //         )
    //     )
    // );

    // @Effect()
    // loadOperator$: Observable<Action> = this.actions$.pipe(
    //     ofType<operatorActions.LoadOperator>(
    //         operatorActions.OperatorActionTypes.LOAD_OPERATOR
    //     ),
    //     map((action: operatorActions.LoadOperator) => action.payload),
    //     mergeMap((id: any) =>
    //         this.operatorService.getOperatorById(id).pipe(
    //             map(
    //                 (response: Response) =>
    //                     new operatorActions.LoadOperatorSuccess(response)
    //             ),
    //             catchError(err =>
    //                 of(new operatorActions.LoadOperatorFail(err)))
    //         )
    //     )
    // );

    // // @Effect()
    // updateOperator$: Observable<Action> = this.actions$.pipe(
    //     ofType<operatorActions.UpdateOperator>(
    //         operatorActions.OperatorActionTypes.UPDATE_OPERATOR
    //     ),
    //     map((action: operatorActions.UpdateOperator) => action.payload),
    //     mergeMap((data: any) =>
    //         this.operatorService.updateOperator(data.id, data.data).pipe(
    //             map(
    //                 (updateCustomer: Response) =>
    //                     new operatorActions.UpdateOperatorSuccess(updateCustomer)
    //             ),
    //             catchError(err => of(new operatorActions.UpdateOperatorFail(err)))
    //         )
    //     )
    // );


    // @Effect()
    // addOperator$: Observable<Action> = this.actions$.pipe(
    //     ofType<operatorActions.AddOperator>(
    //         operatorActions.OperatorActionTypes.ADD_OPERATOR
    //     ),
    //     map((action: operatorActions.AddOperator) => action.payload),
    //     mergeMap((data: any) =>
    //         this.operatorService.addOperator(data).pipe(
    //             map(
    //                 (newAdmin: Response) =>
    //                     new operatorActions.AddOperatorSuccess(newAdmin)
    //             ),
    //             catchError(err =>
    //                 of(new operatorActions.AddOperatorFail(err)))
    //         )
    //     )
    // );


}