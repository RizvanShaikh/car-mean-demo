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

import * as buyerActions from "../state/buyer.actions";
import * as fromBuyer from "../state/buyer.reducer";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-add-buyer',
  templateUrl: './add-edit-buyer.component.html',
  styleUrls: ['./add-edit-buyer.component.scss']
})
export class AddBuyerComponent implements OnInit {

  Editor: any;
  isAdd: Boolean = true;
  addEditBuyerForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  BUYER_CONST: any;
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
    this.BUYER_CONST = this.translate.instant('BUYER');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.translate.instant('MENU.BUYER'));
    titleService.setTitle(APPNAME + " | " + this.BUYER_CONST.MODULE_NAME);
   }

  ngOnInit() {
    this.buildAddBuyerForm();
  }
  buildAddBuyerForm() {
    this.addEditBuyerForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_email: ["", [Validators.required,  Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", [Validators.pattern(validataion.passwordRegEx)]],
      user_confirmPassword: ["", [Validators.required]],
      user_accountType: ["BUYER", [Validators.required]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.addEditBuyerForm.valid) {
      Helpers.setLoading(true);
      const form = await this.addEditBuyerForm.value;
      let obj = {
        user_firstName: form.user_firstName,
        user_lastName: form.user_lastName,
        user_email: form.user_email,
        user_phoneNumber: form.user_phoneNumber,
        user_password: form.user_password,
        user_confirmPassword: form.user_confirmPassword,
        user_accountType: form.user_accountType
      };
    
        this.stateSubscription = this.store.dispatch(new buyerActions.AddBuyer(obj))
        this.stateSubscription = this.store.pipe(select(fromBuyer.selectPageState)).subscribe((data) => {
          if (data && data != undefined) {
            if (data['code'] == 200) {
              Helpers.setLoading(false);
              this.toastr.success(data['message']);
              this.stateSubscription.unsubscribe();
              this.router.navigate(['/admin/buyer/list'])
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
  selector: 'kt-edit-buyer',
  templateUrl: './add-edit-buyer.component.html',
  styleUrls: ['./add-edit-buyer.component.scss']
})
export class EditBuyerComponent implements OnInit {

  isAdd: Boolean = false;
  addEditBuyerForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  id: any;
  BUYER_CONST: any;

  constructor(private subheaderService: SubheaderService,
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

    this.BUYER_CONST = this.translate.instant('BUYER');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.translate.instant('MENU.BUYER'));
    titleService.setTitle(APPNAME + " | " + this.BUYER_CONST.MODULE_NAME);
  }


  ngOnInit() {
    this.buildEditBuyerForm();
    this.getBuyerDatailsById();
  }
  buildEditBuyerForm() {
    this.addEditBuyerForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      user_email: ["", [Validators.required,  Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", [Validators.pattern(validataion.passwordRegEx)]],
      user_confirmPassword: ["", [Validators.required]],
      user_accountType: ["BUYER", [Validators.required]]
    });
  }

  getBuyerDatailsById() {
      this.id = this._route.snapshot.params['id'];
      Helpers.setLoading(true);
  
      this.stateSubscription = this.store.dispatch(new buyerActions.LoadBuyer(this.id));
  
      this.stateSubscription = this.store.pipe(select(fromBuyer.selectPageState)).subscribe(async (data) => {
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
            await this.addEditBuyerForm.patchValue(fd);
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
    if (this.addEditBuyerForm.valid) {

      const form = this.addEditBuyerForm.value;

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
      this.stateSubscription = this.store.dispatch(new buyerActions.UpdateBuyer(obj))

      this.stateSubscription = this.store.pipe(select(fromBuyer.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/buyer/list'])

          } else {
            Helpers.setLoading(false);
            this.toastr.error(data['message']);
          }
        }
      });

    }
  }
}
