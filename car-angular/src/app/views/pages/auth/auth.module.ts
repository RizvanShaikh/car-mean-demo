// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
// Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
// Translate
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// CRUD
// Module components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
// Auth
import {AuthService, AuthGuard } from '../../../core/auth';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
			},
			{
				path: 'reset-password/:token',
				component: ResetPasswordComponent

			}
		]
	}
];


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		RouterModule.forChild(routes),
		MatInputModule,
		MatFormFieldModule,
		MatCheckboxModule,
		TranslateModule.forChild(),
						
	],
	providers: [
		// InterceptService,
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: InterceptService,
		// 	multi: true
		// },
		AuthService,
		AuthGuard,
	],
	exports: [AuthComponent],

	declarations: [
		AuthComponent,
		LoginComponent,
		ResetPasswordComponent,
		ForgotPasswordComponent,
		AuthNoticeComponent
	]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule
		};
	}
}
