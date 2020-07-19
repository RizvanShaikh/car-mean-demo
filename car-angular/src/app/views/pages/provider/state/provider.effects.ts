import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as serviceTypeActions from "./provider.actions";
import { Response } from "../../../../model/model";
import { ProviderService } from '../provider.service';


@Injectable()
export class ProviderEffect {

    constructor(
        private actions$: Actions,
        private providerService: ProviderService
    ) { }

    @Effect()
    deleteProvider$: Observable<Action> = this.actions$.pipe(
        ofType<serviceTypeActions.DeleteProvider>(
            serviceTypeActions.ProviderActionTypes.DELETE_PROVIDER
        ),
        map((action: serviceTypeActions.DeleteProvider) => action.payload),
        mergeMap((id: any) =>
            this.providerService.deleteProviderById(id).pipe(
                map(
                    (response: Response) =>
                        new serviceTypeActions.DeleteProviderSuccess(response)
                ),
                catchError(err =>
                    of(new serviceTypeActions.DeleteProviderFail(err)))
            )
        )
    );


    @Effect()
    updateStatus$: Observable<Action> = this.actions$.pipe(
        ofType<serviceTypeActions.UpdateStatus>(
            serviceTypeActions.ProviderActionTypes.UPDATE_STATUS
        ),
        map((action: serviceTypeActions.UpdateStatus) => action.payload),
        mergeMap((data: any) =>
            this.providerService.updateStatus(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new serviceTypeActions.UpdateStatusSuccess(updateCustomer)
                ),
                catchError(err => of(new serviceTypeActions.UpdateStatusFail(err)))
            )
        )
    );

    @Effect()
    loadProvider$: Observable<Action> = this.actions$.pipe(
        ofType<serviceTypeActions.LoadProvider>(
            serviceTypeActions.ProviderActionTypes.LOAD_PROVIDER
        ),
        map((action: serviceTypeActions.LoadProvider) => action.payload),
        mergeMap((id: any) =>
            this.providerService.getProviderById(id).pipe(
                map(
                    (response: Response) =>
                        new serviceTypeActions.LoadProviderSuccess(response)
                ),
                catchError(err =>
                    of(new serviceTypeActions.LoadProviderFail(err)))
            )
        )
    );

    @Effect()
    updateProvider$: Observable<Action> = this.actions$.pipe(
        ofType<serviceTypeActions.UpdateProvider>(
            serviceTypeActions.ProviderActionTypes.UPDATE_PROVIDER
        ),
        map((action: serviceTypeActions.UpdateProvider) => action.payload),
        mergeMap((data: any) =>
            this.providerService.updateProvider(data.id, data.data).pipe(
                map(
                    (updateCustomer: Response) =>
                        new serviceTypeActions.UpdateProviderSuccess(updateCustomer)
                ),
                catchError(err => of(new serviceTypeActions.UpdateProviderFail(err)))
            )
        )
    );


    @Effect()
    addProvider$: Observable<Action> = this.actions$.pipe(
        ofType<serviceTypeActions.AddProvider>(
            serviceTypeActions.ProviderActionTypes.ADD_PROVIDER
        ),
        map((action: serviceTypeActions.AddProvider) => action.payload),
        mergeMap((data: any) =>
            this.providerService.addProvider(data).pipe(
                map(
                    (newAdmin: Response) =>
                        new serviceTypeActions.AddProviderSuccess(newAdmin)
                ),
                catchError(err =>
                    of(new serviceTypeActions.AddProviderFail(err)))
            )
        )
    );


}