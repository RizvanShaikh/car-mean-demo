import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { AddTemplateComponent, EditTemplateComponent } from './add-edit-template/add-edit-template.component';
import { TemplateListComponent } from './template-list/template-list.component';

import { Routes, RouterModule } from '@angular/router';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule, Actions } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import { TemplateEffect } from './state/template.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TemplateReducer } from './state/template.reducer';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import * as Helper from "../../../helper/page.title"
import { AccessGuardPermissionGuard } from '../../../core/auth/_guards/access-guard-permission.guard';

const menuPermision = Helper.PERMISSIONS.MAIN_MENU.CONTENT

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: TemplateListComponent,
        canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.SERVICE_TYPE.READ,
				// 	mainModulePermission:menuPermision
				// } 
      },
      {
        path: 'add',
        component: AddTemplateComponent,
        canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.SERVICE_TYPE.CREATE,
				// 	mainModulePermission:menuPermision
				// } 
      },
      {
        path: 'edit/:id',
        component: EditTemplateComponent,
        canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.SERVICE_TYPE.EDIT,
				// 	mainModulePermission:menuPermision
				// } 
      }
    ]
  }
];


@NgModule({
  declarations: [ TemplateComponent, TemplateListComponent, AddTemplateComponent, EditTemplateComponent ],
  providers: [ScriptLoaderService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([TemplateEffect]),
    StoreModule.forFeature("template", TemplateReducer),
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    CKEditorModule,
    AngularMultiSelectModule
  ]
})
export class TemplateModule { }
