// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]),
		TranslateModule.forChild()

	],
	providers: [],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
