// Angular
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Auth
import { AuthService } from '../../../../core/auth';
import { validataion } from '../../../../helper/regular.expression';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-reset-password',
	templateUrl: './reset-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
	resetPassForm: FormGroup;
	loading = false;

	submitted: Boolean = false;
	token;

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private toastr: ToastrService,
		private router: Router,
		private auth: AuthService,
		private fb: FormBuilder,
		private route: ActivatedRoute,

	) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.buildResetPassForm();

		this.token = {
			Authorization: this.route.snapshot.paramMap.get('token')
		};

		this.auth.authToken(this.token['Authorization']).subscribe((result) => {

			if (result['data'] != null) {

				if (result['data'].blt_token === this.route.snapshot.paramMap.get('token')) {
					this.toastr.error('Link has been expired');
					// TODO ----  PUT ROUTER
					// this.router.navigate(['login']);
				}
			}
		});


		// authToken
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	buildResetPassForm() {
		this.resetPassForm = this.fb.group({
			user_password: ['', [Validators.required, Validators.pattern(validataion.passwordRegEx)]],
			user_confirm_password: ['', [Validators.required, Validators.pattern(validataion.passwordRegEx)]]
		}
		);
	}



	ResetPassword() {
		this.submitted = true;
		/** Validate reset form */
		if (this.resetPassForm.valid) {

			/** If both password same than next  */
			if (this.resetPassForm.value.user_password === this.resetPassForm.value.user_confirm_password) {
				this.auth.resetPassword(this.token, this.resetPassForm.value)
					.subscribe((data) => {
						if (data['code'] === 200) {

							  this.router.navigate(['/admin/login']);
							this.toastr.success(data['message']);
						} else {
							this.toastr.error(data['message']);
						}
					});
			} else {
				this.toastr.error('password does not match');
			}
		}
	}
}
