import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule, Actions } from "@ngrx/effects";

import { StoreModule } from "@ngrx/store";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import * as Helper from "../../../helper/page.title"
import { ProviderComponent } from './provider.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { AddProviderComponent, EditProviderComponent } from './add-edit-provider/add-edit-provider.component';
import { ProviderEffect } from './state/provider.effects';
import { ProviderReducer } from './state/provider.reducer';


const routes: Routes = [
  {
    path: '',
    component: ProviderComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProviderListComponent
      },
      {
        path: 'add',
        component: AddProviderComponent 
      },
      {
        path: 'edit/:id',
        component: EditProviderComponent
      }
    ]
  }
];


@NgModule({
  declarations: [ProviderComponent, ProviderListComponent, AddProviderComponent, EditProviderComponent],
  providers: [ScriptLoaderService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([ProviderEffect]),
    StoreModule.forFeature("provider", ProviderReducer),
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    CKEditorModule
  ]
})
export class ProviderModule { }
