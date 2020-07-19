// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { LocalstorageService } from '../../../services/localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
        private router: Router,
        public localstorageService: LocalstorageService,
        private toastr: ToastrService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        /** check token is exist or not in our localstorage */
        if (this.localstorageService.getToken()) {

            /** call api check token is valid or not */
            // return this.auth.isAdmin().pipe(
            //     map((data: Response) => {
            //         if (data['code'] === 200) {
            //             return true;
            //         } else {
            //             this.toastr.error(data['message']);
            //             this.router.navigate(['/admin/login']);
            //             return false;
            //         }
            //     }));
        } else {
            this.toastr.error('Please login.');
            this.router.navigate(['/admin/login']);
            return false;
        }

    }
}
