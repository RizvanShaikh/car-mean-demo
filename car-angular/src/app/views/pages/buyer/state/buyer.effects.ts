import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as buyerActions from "./buyer.actions";
import { Response } from "../../../../model/model";
import { BuyerService } from '../buyer.service';


@Injectable()
export class BuyerEffect {

    constructor(
        private actions$: Actions,
        private BuyerService: BuyerService
    ) { }

    @Effect()
    deleteBuyer$: Observable<Action> = this.actions$.pipe(
        ofType<buyerActions.DeleteBuyer>(
            buyerActions.BuyerActionTypes.DELETE_BUYER
        ),
        map((action: buyerActions.DeleteBuyer) => action.payload),
        mergeMap((id: any) =>
            this.BuyerService.deleteBuyerById(id).pipe(
                map(
                    (response: Response) =>
                        new buyerActions.DeleteBuyerSuccess(response)
                ),
                catchError(err =>
                    of(new buyerActions.DeleteBuyerFail(err)))
            )
        )
    );


    @Effect()
    updateStatus$: Observable<Action> = this.actions$.pipe(
        ofType<buyerActions.UpdateStatus>(
            buyerActions.BuyerActionTypes.UPDATE_STATUS
        ),
        map((action: buyerActions.UpdateStatus) => action.payload),
        mergeMap((data: any) =>
            this.BuyerService.updateStatus(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new buyerActions.UpdateStatusSuccess(updateCustomer)
                ),
                catchError(err => of(new buyerActions.UpdateStatusFail(err)))
            )
        )
    );

    @Effect()
    loadBuyer$: Observable<Action> = this.actions$.pipe(
        ofType<buyerActions.LoadBuyer>(
            buyerActions.BuyerActionTypes.LOAD_BUYER
        ),
        map((action: buyerActions.LoadBuyer) => action.payload),
        mergeMap((id: any) =>
            this.BuyerService.getBuyerById(id).pipe(
                map(
                    (response: Response) =>
                        new buyerActions.LoadBuyerSuccess(response)
                ),
                catchError(err =>
                    of(new buyerActions.LoadBuyerFail(err)))
            )
        )
    );

    @Effect()
    updateBuyer$: Observable<Action> = this.actions$.pipe(
        ofType<buyerActions.UpdateBuyer>(
            buyerActions.BuyerActionTypes.UPDATE_BUYER
        ),
        map((action: buyerActions.UpdateBuyer) => action.payload),
        mergeMap((data: any) =>
            this.BuyerService.updateBuyer(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new buyerActions.UpdateBuyerSuccess(updateCustomer)
                ),
                catchError(err => of(new buyerActions.UpdateBuyerFail(err)))
            )
        )
    );


    @Effect()
    addBuyer$: Observable<Action> = this.actions$.pipe(
        ofType<buyerActions.AddBuyer>(
            buyerActions.BuyerActionTypes.ADD_BUYER
        ),
        map((action: buyerActions.AddBuyer) => action.payload),
        mergeMap((data: any) =>
            this.BuyerService.addBuyer(data).pipe(
                map(
                    (newAdmin: Response) =>
                        new buyerActions.AddBuyerSuccess(newAdmin)
                ),
                catchError(err =>
                    of(new buyerActions.AddBuyerFail(err)))
            )
        )
    );


}