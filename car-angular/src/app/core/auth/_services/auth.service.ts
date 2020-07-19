import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import {  map } from 'rxjs/operators';

import { ApiURIs } from '../../../../api-constants';
import { LocalstorageService } from '../../../services/localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, public localStorageService: LocalstorageService) { }

    getHeader() {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        const token = this.localStorageService.getToken();
        headers = headers.set('Authorization', token);
        return headers;
    }
    //-------admin start------------------------------------
    login(user_email: string, user_password: string) {
        let obj = { 'user_email': user_email, 'user_password': user_password };
        return this.http.post(ApiURIs.login, obj).pipe(
            map((res: Response) => res));
    }

    isAdmin() {
        return this.http.get(ApiURIs.sqAdmin, { headers: this.getHeader() });
    }

    /**  Admin Forgot Password */
    forgotPassword(data) {
        return this.http.post(ApiURIs.forgotPassword, data).pipe(
            map((res: Response) => res));
    }

    /**  Admin Reset Password */
    resetPassword(token, data) {
        return this.http.post(ApiURIs.resetPassword, data, { headers: token }).pipe(
            map((res: Response) => res));
    }

    authToken(token) {
        return this.http.get(ApiURIs.authToken, { headers: this.getCustHeader(token) }).pipe(
            map((res: Response) => res));
    }

    getCustHeader(token) {
        let headers = new HttpHeaders()
        headers = headers.set('Authorization', token);
        return headers;
    }

    //----------------------------------admin end




    /*
     * Handle Http operation that failed.
     * Let the app continue.
   *
   * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result);
        };
    }
}
