import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as contactUsActions from "./contact-us.actions";
import { Response } from "../../../../model/model";
import { ContactUsManagementService } from '../contact-us-management.service';


@Injectable()
export class ContactUsEffect {

    constructor(
        private actions$: Actions,
        private contactUsService: ContactUsManagementService
    ) { }

    @Effect()
    loadContactUs$: Observable<Action> = this.actions$.pipe(
        ofType<contactUsActions.LoadContactUs>(
            contactUsActions.ContactUsActionTypes.LOAD_CONTACTUS
        ),
        map((action: contactUsActions.LoadContactUs) => action.payload),
        mergeMap((id: any) =>
            this.contactUsService.getContactUsById(id).pipe(
                map(
                    (response: Response) =>
                        new contactUsActions.LoadContactUsSuccess(response)
                ),
                catchError(err =>
                    of(new contactUsActions.LoadContactUsFail(err)))
            )
        )
    );

}