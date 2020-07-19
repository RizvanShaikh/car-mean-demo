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

import { BuyerEffect } from './state/buyer.effects';
import { BuyerReducer } from './state/buyer.reducer';
import { BuyerComponent } from './buyer.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { AddBuyerComponent, EditBuyerComponent } from './add-edit-buyer/add-edit-buyer.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: BuyerListComponent
      },
      {
        path: 'add',
        component: AddBuyerComponent 
      },
      {
        path: 'edit/:id',
        component: EditBuyerComponent
      }
    ]
  }
];


@NgModule({
  declarations: [BuyerComponent, BuyerListComponent, AddBuyerComponent, EditBuyerComponent],
  providers: [ScriptLoaderService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([BuyerEffect]),
    StoreModule.forFeature("buyer", BuyerReducer),
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    CKEditorModule
  ]
})
export class BuyerModule { }
