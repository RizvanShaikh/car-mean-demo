// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Auth
import { AuthNoticeService, AuthService } from '../../../../core/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-forgot-password',
	templateUrl: './forgot-password.component.html',
	encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
	// Public params
	forgotPasswordForm: FormGroup;
	loading = false;
	errors: any = [];
	submitted1: Boolean = false;

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authService
	 * @param authNoticeService
	 * @param translate
	 * @param router
	 * @param fb
	 * @param cdr
	 */
	constructor(
		private authService: AuthService,
		public authNoticeService: AuthNoticeService,
		private toastr: ToastrService,
		private router: Router,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.buildForgotPasswordForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	buildForgotPasswordForm() {
		/** build forhetpassword form */
		this.forgotPasswordForm = this.fb.group({
			user_email: ['', [Validators.required, Validators.email]]
		});

	}

	/**
	 * Form Submit
	 */
	forgotPass() {
		// const controls = this.forgotPasswordForm.controls;
		// /** check form */
		// if (this.forgotPasswordForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);
		// 	return;
		// }

		// this.loading = true;

		// const email = controls.email.value;
		// this.authService.requestPassword(email).pipe(
		// 	tap(response => {
		// 		if (response) {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.FORGOT.SUCCESS'), 'success');
		// 			this.router.navigateByUrl('/auth/login');
		// 		} else {
		// 			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.NOT_FOUND', {name: this.translate.instant('AUTH.INPUT.EMAIL')}), 'danger');
		// 		}
		// 	}),
		// 	takeUntil(this.unsubscribe),
		// 	finalize(() => {
		// 		this.loading = false;
		// 		this.cdr.markForCheck();
		// 	})
		// ).subscribe();


		this.submitted1 = true;
		if (this.forgotPasswordForm.valid) {
			/**forget password api call */
			console.log(this.forgotPasswordForm.valid, "this.forgotPasswordForm.valid")
			this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((data) => {

				/** check api responce success or not  */
				if (data['code'] === 200) {

					this.toastr.success(data['message']);
					/** Open login form */
					this.router.navigateByUrl('/auth/login');
					this.forgotPasswordForm.patchValue({ email: '' }); // clean the form value
					this.submitted1 = false;

				} else {
					this.toastr.error(data['message']);
				}

			});
		} else {
			return false;
		}

	}

}
