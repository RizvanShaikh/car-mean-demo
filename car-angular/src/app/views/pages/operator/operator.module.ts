import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOperatorComponent, EditOperatorComponent } from './add-edit-operator/add-edit-operator.component';
import { OperatorListComponent } from './operator-list/operator-list.component';


import { Routes, RouterModule } from '@angular/router';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule, Actions } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import { OperatorEffect } from './state/operator.effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OperatorReducer } from './state/operator.reducer';

import * as Helper from "../../../helper/page.title"
import { AccessGuardPermissionGuard } from '../../../core/auth/_guards/access-guard-permission.guard';
import { OperatorComponent } from './operator.component';


const routes: Routes = [
  {
    path: '',
    component: OperatorComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: OperatorListComponent,
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.OPERATOR.READ
				// } 
      },
      {
        path: 'add',
        component: AddOperatorComponent
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.OPERATOR.CREATE
				// } 
      },
      {
        path: 'edit/:id',
        component: EditOperatorComponent,
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.OPERATOR.EDIT
				// } 
      }
    ]
  }
];


@NgModule({
  declarations: [ OperatorComponent, OperatorListComponent, AddOperatorComponent, EditOperatorComponent ],
  providers: [ScriptLoaderService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([OperatorEffect]),
    StoreModule.forFeature("operator", OperatorReducer),
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    CKEditorModule
  ]
})
export class OperatorModule { }
