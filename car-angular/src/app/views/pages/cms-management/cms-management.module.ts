import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsManagementComponent } from './cms-management.component';
import { CmsListComponent } from './cms-list/cms-list.component';
import { AddCmsComponent, EditCmsComponent } from './add-edit-cms/add-edit-cms.component';

import { Routes, RouterModule } from '@angular/router';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule, Actions } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import { CMSEffect } from './state/cms.effects';
import { cmsReducer } from './state/cms.reducer';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import * as Helper from "../../../helper/page.title"
import { AccessGuardPermissionGuard } from '../../../core/auth/_guards/access-guard-permission.guard';

const menuPermision = Helper.PERMISSIONS.MAIN_MENU.CONTENT

const routes: Routes = [
  {
    path: '',
    component: CmsManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: CmsListComponent,
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
        //   permission: Helper.PERMISSIONS.CMS.READ,
        //   mainModulePermission:menuPermision
				// } 
      },
      {
        path: 'add',
        component: AddCmsComponent,
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
        //   permission: Helper.PERMISSIONS.CMS.CREATE,
        //   mainModulePermission:menuPermision
				// } 
      },
      {
        path: 'edit/:id',
        component: EditCmsComponent,
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
        //   permission: Helper.PERMISSIONS.CMS.EDIT,
        //   mainModulePermission:menuPermision
				// } 
      }
    ]
  }
];


@NgModule({
  declarations: [CmsManagementComponent, CmsListComponent,  AddCmsComponent, EditCmsComponent],
  providers: [ScriptLoaderService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([CMSEffect]),
    StoreModule.forFeature("cms", cmsReducer),
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    CKEditorModule
  ]
})
export class CmsManagementModule { }
