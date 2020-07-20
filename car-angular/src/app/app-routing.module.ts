// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth/_guards/auth.guard';
import { HOMEComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', component: HOMEComponent },

	{ path: 'admin', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: 'admin',
		component: BaseComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
			},
			{
				path: 'admin-management',
				loadChildren: () => import('./views/pages/admin-management/admin-management.module').then(m => m.AdminManagementModule),
			},
			{
				path: 'cms-management',
				loadChildren: () => import('./views/pages/cms-management/cms-management.module').then(m => m.CmsManagementModule),
			},
			{
				path: 'contact-us-management',
				loadChildren: () => import('./views/pages/contact-us-management/contact-us-management.module').then(m => m.ContactUsManagementModule),
			},
			{
				path: 'provider',
				loadChildren: () => import('./views/pages/provider/provider.module').then(m => m.ProviderModule),
			},
			{
				path: 'buyer',
				loadChildren: () => import('./views/pages/buyer/buyer.module').then(m => m.BuyerModule),
			},
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
		],
	},

	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule],

})
export class AppRoutingModule {
}
