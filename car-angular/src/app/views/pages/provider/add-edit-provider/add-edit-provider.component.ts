import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';

import { SubheaderService } from '../../../../core/_base/layout/services/subheader.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { titles, subHeader, APPNAME } from '../../../../helper/page.title';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { validataion } from '../../../../helper/regular.expression';
import { Store, State, select } from "@ngrx/store";
import { Helpers } from '../../../../helper/helper';

import * as providerActions from "../state/provider.actions";
import * as fromProvider from "../state/provider.reducer";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-add-provider',
  templateUrl: './add-edit-provider.component.html',
  styleUrls: ['./add-edit-provider.component.scss']
})
export class AddProviderComponent implements OnInit {

  Editor: any;
  isAdd: Boolean = true;
  addEditProviderForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  PROVIDER_CONST: any;
  id: any;
 
  constructor(
    private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private dtr: ChangeDetectorRef,
    private store: Store<{ school: any }>,
    titleService: Title,
    private translate: TranslateService
  ) { 
    this.PROVIDER_CONST = this.translate.instant('PROVIDER');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.translate.instant('MENU.PROVIDER'));
    titleService.setTitle(APPNAME + " | " + this.PROVIDER_CONST.MODULE_NAME);
  }

  ngOnInit() {
    this.buildAddProviderForm();
  }
  buildAddProviderForm() {
    this.addEditProviderForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_email: ["", [Validators.required,  Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", [Validators.pattern(validataion.passwordRegEx)]],
      user_confirmPassword: ["", [Validators.required]],
      user_accountType: ["PROVIDER", [Validators.required]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.addEditProviderForm.valid) {
      Helpers.setLoading(true);
      const form = await this.addEditProviderForm.value;
      let obj = {
        user_firstName: form.user_firstName,
        user_lastName: form.user_lastName,
        user_email: form.user_email,
        user_phoneNumber: form.user_phoneNumber,
        user_password: form.user_password,
        user_confirmPassword: form.user_confirmPassword,
        user_accountType: form.user_accountType
      };
    
        this.stateSubscription = this.store.dispatch(new providerActions.AddProvider(obj))
        this.stateSubscription = this.store.pipe(select(fromProvider.selectPageState)).subscribe((data) => {
          if (data && data != undefined) {
            if (data['code'] == 200) {
              Helpers.setLoading(false);
              this.toastr.success(data['message']);
              this.stateSubscription.unsubscribe();
              this.router.navigate(['/admin/provider/list'])
            } else {
              Helpers.setLoading(false);
              this.toastr.error(data['message']);
              this.stateSubscription.unsubscribe();
    
            }
          }
        });
    }
  }
}

@Component({
  selector: 'kt-edit-provider',
  templateUrl: './add-edit-provider.component.html',
  styleUrls: ['./add-edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
 
  isAdd: Boolean = false;
  addEditProviderForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  id: any;
  PROVIDER_CONST: any;

  constructor(
    private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private _route: ActivatedRoute,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private dtr: ChangeDetectorRef,
    private store: Store<{ school: any }>,
    titleService: Title,
    private translate: TranslateService
  ) { 
    this.PROVIDER_CONST = this.translate.instant('PROVIDER');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.translate.instant('MENU.PROVIDER'));
    titleService.setTitle(APPNAME + " | " + this.PROVIDER_CONST.MODULE_NAME);
  }

  ngOnInit() {
    this.buildEditProviderForm();
    this.getProviderDatailsById();
  }

  buildEditProviderForm() {
    this.addEditProviderForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_email: ["", [Validators.required,  Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", [Validators.pattern(validataion.passwordRegEx)]],
      user_confirmPassword: ["", [Validators.required]],
      user_accountType: ["PROVIDER", [Validators.required]]
    });
  }

  getProviderDatailsById() {
      this.id = this._route.snapshot.params['id'];
      Helpers.setLoading(true);
  
      this.stateSubscription = this.store.dispatch(new providerActions.LoadProvider(this.id));
  
      this.stateSubscription = this.store.pipe(select(fromProvider.selectPageState)).subscribe(async (data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {
            let result = data['data'];
            let fd = {
              user_firstName: result.user_firstName,
              user_lastName: result.user_lastName,
              user_email: result.user_email,
              user_phoneNumber: result.user_phoneNumber,
              user_password: result.user_password,
              user_confirmPassword: result.user_confirmPassword,
              user_accountType: result.user_accountType
            };
            await this.addEditProviderForm.patchValue(fd);
            Helpers.setLoading(false);
  
            this.stateSubscription.unsubscribe();
  
          } else {
            Helpers.setLoading(false);
  
            this.toastr.error(data['message']);
            this.stateSubscription.unsubscribe();
  
          }
        }
      });
    
  }

  async onSubmit() {
    this.submitted = true;
    if (this.addEditProviderForm.valid) {

      const form = this.addEditProviderForm.value;

      Helpers.setLoading(true);


      let obj = {
        id: this.id,
        data: {
          user_firstName: form.user_firstName,
          user_lastName: form.user_lastName,
          user_email: form.user_email,
          user_phoneNumber: form.user_phoneNumber,
          user_password: form.user_password,
          user_confirmPassword: form.user_confirmPassword,
          user_accountType: form.user_accountType
        }
      };
console.log(obj.data, 'obj data')
      this.stateSubscription = this.store.dispatch(new providerActions.UpdateProvider(obj))

      this.stateSubscription = this.store.pipe(select(fromProvider.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/provider/list'])

          } else {
            Helpers.setLoading(false);
            this.toastr.error(data['message']);
          }
        }
      });

    }
  }

}
