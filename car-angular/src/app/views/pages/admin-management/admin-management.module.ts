import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagementComponent } from './admin-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { AddAdminComponent,EditAdminComponent } from './add-edit-admin/add-edit-admin.component';
import { AdminManagementService } from './admin-management.service';
import { EffectsModule, Actions } from "@ngrx/effects";
import { AdminEffect } from "./state/admin.effects";
import { StoreModule } from "@ngrx/store";
import { adminReducer } from "./state/admin reducer";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AccessGuardPermissionGuard } from '../../../core/auth/_guards/access-guard-permission.guard';
import * as Helper from "../../../helper/page.title"

const menuPermision = Helper.PERMISSIONS.MAIN_MENU.SITE_USER

const routes: Routes = [
	{
		path: '',
		component: AdminManagementComponent,
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
				
			},
			{
				path: 'list',
				component: AdminListComponent,
				canActivate: [AccessGuardPermissionGuard], 
				data: { 
					permission: Helper.PERMISSIONS.ADMIN.READ,
					mainModulePermission:menuPermision
				} 
			},
			{
				path: 'add',
				component: AddAdminComponent,
				canActivate: [AccessGuardPermissionGuard], 
				data: { 
					permission: Helper.PERMISSIONS.ADMIN.CREATE,
					mainModulePermission:menuPermision
				} 
			},
			{
				path: 'edit/:id',
				component: EditAdminComponent,
				canActivate: [AccessGuardPermissionGuard], 
				data: { 
					permission: Helper.PERMISSIONS.ADMIN.EDIT,
					mainModulePermission:menuPermision
				} 
			},
		]
	}
];

@NgModule({
	declarations: [AdminManagementComponent, AdminListComponent,  AddAdminComponent,EditAdminComponent ],
	providers: [ScriptLoaderService,AdminManagementService],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RouterModule.forChild(routes),
		EffectsModule.forFeature([AdminEffect]),
		StoreModule.forFeature("admins", adminReducer),
		TranslateModule.forChild()

	]
})
export class AdminManagementModule { }
