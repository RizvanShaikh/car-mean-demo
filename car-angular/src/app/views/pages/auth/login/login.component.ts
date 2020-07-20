// Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthService } from '../../../../core/auth';
import { Title } from '@angular/platform-browser';
import { titles } from '../../../../helper/page.title';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { Helpers } from '../../../../helper/helper';
// import { RolesService } from '../../roles/roles.service';
@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	submitted: Boolean = false;
	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private route: ActivatedRoute,
		private toastr: ToastrService,
		public localStorageService: LocalstorageService,
		private store: Store<AppState>,
		private formBuilder: FormBuilder,
		// private roleService: RolesService,
		title: Title
	) {
		title.setTitle(titles.login);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.initLoginForm();
		Helpers.setLoading(false);
		// // redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {

			this.returnUrl = params.returnUrl || '/admin/dashboard';
		});
	}
	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		/** Build signup form */
		this.loginForm = this.formBuilder.group({
			user_email: ['', [Validators.required, Validators.email]],
			user_password: ['', [Validators.required]],
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		Helpers.setLoading(true);
		this.submitted = true;

		const result = this.loginForm.value;
		/** check form */
		if (this.loginForm.invalid) {
			Helpers.setLoading(false);
			return;
		}
		else {
			this.loading = true;
			this.auth
				.login(result.user_email, result.user_password).subscribe((data) => {
					if (data['code'] === 200) {

						let result = data['data']['user']

						this.localStorageService.setToken(result.user_jwt);
						let setObj = {
							_id: result._id,
							user_fullName: result.user_fullName,
							user_phoneNumber: result.user_phoneNumber,
							user_email: result.user_email	
						}
						this.localStorageService.setCurruntUser(setObj)
						Helpers.setLoading(false);
						this.toastr.success(data['message']);
						console.log("data")
						this.router.navigate(['/admin/dashboard']);
					} else {
						Helpers.setLoading(false);
						this.toastr.error(data['message']);
					}
				}, (error) => {
					if (error.status == 0) {
						Helpers.setLoading(false);
						this.toastr.error("Connection Error...!!!");

					} else {
						Helpers.setLoading(false);
						this.toastr.error(error.error.message);

					}
				})
		}
	}

	// setSessionPermissionArray(user) {

	// 	if (user && user.user_roleId != "") {
	// 		this.roleService.getRoleWisePermissions(user.user_roleId).subscribe((data) => {
	// 			if (data['code']) {
	// 				this.localStorageService.setBehaviorView(data['data'].permissions)
	// 			}
	// 		})
	// 	}
	// }
}
