import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EffectsModule, Actions } from "@ngrx/effects";
import { AdminEffect } from "../admin-management/state/admin.effects";
import { StoreModule } from "@ngrx/store";
import { adminReducer } from "../admin-management/state/admin reducer";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: EditProfileComponent
      },
    ]
  }
];

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
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
export class ProfileModule { }
