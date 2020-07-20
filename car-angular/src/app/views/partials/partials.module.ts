// Angular
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatProgressSpinnerModule,
} from '@angular/material';
// NgBootstrap
import {NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
// Perfect Scrollbar
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
// Core module
import {CoreModule} from '../../core/core.module';

// Layout partials
import {
	ScrollTopComponent,
	SplashScreenComponent,
	Subheader1Component,
	UserProfileComponent,
} from './layout';

// SVG inline
import {InlineSVGModule} from 'ng-inline-svg';
import {CartComponent} from './layout/topbar/cart/cart.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [
		ScrollTopComponent,
		SplashScreenComponent,
		Subheader1Component,
		UserProfileComponent,
		CartComponent,
	],
	exports: [
		// topbar components
		ScrollTopComponent,
		SplashScreenComponent,
		Subheader1Component,
		UserProfileComponent,
		CartComponent,
		NgbDropdownModule
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		TranslateModule.forChild(),
		ReactiveFormsModule,
		PerfectScrollbarModule,
		InlineSVGModule,
		CoreModule,
		MatProgressSpinnerModule,
		NgbDropdownModule
	],
})
export class PartialsModule {
}
