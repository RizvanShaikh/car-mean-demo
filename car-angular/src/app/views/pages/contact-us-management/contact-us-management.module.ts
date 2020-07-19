import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { AdminListComponent } from './admin-list/admin-list.component';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { EffectsModule, Actions } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ContactUsManagementComponent } from './contact-us-management.component';
import { ContactUsListComponent } from './contact-us-list/contact-us-list.component';
import { ContactUsEffect } from './state/contact-us.effects';
import { contactUsReducer } from './state/contact-us.reducer';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import * as Helper from "../../../helper/page.title"
import { AccessGuardPermissionGuard } from '../../../core/auth/_guards/access-guard-permission.guard';

//const menuPermision = Helper.PERMISSIONS.MAIN_MENU.CONTENT

const routes: Routes = [
  {
    path: '',
    component: ContactUsManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ContactUsListComponent
        // canActivate: [AccessGuardPermissionGuard], 
				// data: { 
				// 	permission: Helper.PERMISSIONS.CONTACT.READ,
				// 	mainModulePermission:menuPermision
				// } 
      },
    ]
  }
];



@NgModule({
  declarations: [ContactUsManagementComponent, ContactUsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ContactUsEffect]),
    StoreModule.forFeature("contact-us", contactUsReducer),
    TranslateModule.forChild()

  ],
  providers: [
    ScriptLoaderService,
  ]
})
export class ContactUsManagementModule { }
