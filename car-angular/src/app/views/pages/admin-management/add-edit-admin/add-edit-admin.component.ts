import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout/services/subheader.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../../helper/page.title';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { validataion } from '../../../../helper/regular.expression';
import { Store, State, select } from "@ngrx/store";

import * as adminActions from "../state/admin.actions";
import * as fromAdmin from "../state/admin reducer";
import { Helpers } from '../../../../helper/helper';
import { SplashScreenService } from '../../../../core/_base/layout/services/splash-screen.service';
// import { RolesService } from '../../roles/roles.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-add-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.scss']
})


export class AddAdminComponent implements OnInit {
  isAdd: Boolean = true;
  addEditAdminForm: FormGroup;
  submitted: Boolean = false;
  role: any = '';
  stateSubscription: any;
  roles :any = [];
  ADMIN_CONST: any;

  constructor(
    private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private splashScreenService: SplashScreenService,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private store: Store<{ admin: any }>,
    titleService: Title,
    private dtr: ChangeDetectorRef,
    // private roleService:RolesService,
    private translate: TranslateService

  ) {
    this.ADMIN_CONST = this.translate.instant("ADMIN");

    this.subheaderService.setTitle(subHeader.ADMIN);
    titleService.setTitle(titles.adminManagement);

  }

  ngOnInit() {
    this.buildAddAdminForm()
    // this.getRoleDetails();
    let user = this.localStorageService.getCurruntUser();
    if (user && user != null) {
      this.role = user && user.user_roleId ? user.user_roleId : '';
    }

  }

  buildAddAdminForm() {
    this.addEditAdminForm = this._formBuilder.group({
      // user_fullName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_roleId: ["", [Validators.required]],
      user_email: ["", [Validators.required, Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", [Validators.required, Validators.pattern(validataion.passwordRegEx)]],
      // user_profileImage: ["", [Validators.required]],

    });
  }

 
  // getRoleDetails() {
   
  //   Helpers.setLoading(true);
  //   this.roleService.getRolesList().subscribe(async (data) => {
  //     if (data['code'] == 200) {
  //       let result = data['data'];
  //       console.log(result);
  //       this.roles = result
  //       this.dtr.detectChanges();
     
  //       Helpers.setLoading(false);
  //     } else {
  //       Helpers.setLoading(false);
  //       this.toastr.error(data['message']);
  //     }
  //   });
  // }

  async onSubmit() {
    this.submitted = true;
    if (this.addEditAdminForm.valid) {
      Helpers.setLoading(true)
      this.stateSubscription =  this.store.dispatch(new adminActions.CreateAdmin(this.addEditAdminForm.value))
      this.stateSubscription =  this.store.pipe(select(fromAdmin.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {
            Helpers.setLoading(false);

            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/admin-management/list'])
          } else {
            Helpers.setLoading(false);
            this.stateSubscription.unsubscribe();

            this.toastr.error(data['message']);
          }
        }
      });
    }

  }
  onkeyUp(e) {

  }
}


@Component({
  selector: 'kt-edit-admin',
  templateUrl: './add-edit-admin.component.html',
  styleUrls: ['./add-edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  addEditAdminForm: FormGroup;
  isAdd: Boolean = false;
  submitted: Boolean = false;
  role: any = '';
  id: any;
  roles : any = [];
  stateSubscription: any;
  constructor(
    private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    public localStorageService: LocalstorageService,
    private store: Store<{ admin: any }>,
    titleService: Title,
    private dtr : ChangeDetectorRef,
    // private roleService : RolesService
  ) {
    this.subheaderService.setTitle(subHeader.ADMIN);
    titleService.setTitle(titles.adminManagement);

  }

  async ngOnInit() {
    this.buildAddAdminForm()
    this.localStorageService.getCurruntUser();
    let user = this.localStorageService.getCurruntUser();
    if (user && user != null) {
      this.role = user && user.user_roleId ? user.user_roleId : '';
    }
    // this.getRoleDetails();
    await this.getAdminDetails();

  }

  buildAddAdminForm() {
    this.addEditAdminForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_roleId: ["", [Validators.required]],
      user_email: ["", [Validators.required, Validators.pattern(validataion.emailRegEx)]],
      user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_password: ["", []]
    });
  }

  async getAdminDetails() {
    this.id = this._route.snapshot.params['id'];
    Helpers.setLoading(true);

    this.stateSubscription = this.store.dispatch(new adminActions.LoadAdmin(this.id));

    this.stateSubscription = await this.store.pipe(select(fromAdmin.selectPageState)).subscribe(async (data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          let fd = {
            user_firstName: data['data'].user_firstName,
            user_lastName: data['data'].user_lastName,
            user_roleId: data['data'].user_roleId,
            user_email: data['data'].user_email,
            user_phoneNumber: data['data'].user_phoneNumber

          };
          await this.addEditAdminForm.patchValue(fd);
          Helpers.setLoading(false);

          this.stateSubscription.unsubscribe();

        } else {
          Helpers.setLoading(false);
          this.stateSubscription.unsubscribe();

          this.toastr.error(data['message']);
        }
      }
    });

  }
  // getRoleDetails() {
  //   Helpers.setLoading(true);
  //   this.roleService.getRolesList().subscribe(async (data) => {
  //     if (data['code'] == 200) {
  //       let result = data['data'];
  //       console.log(result);
  //       this.roles = result
  //       this.dtr.detectChanges();
  //       Helpers.setLoading(false);
  //     } else {
  //       Helpers.setLoading(false);
  //       this.toastr.error(data['message']);
  //     }
  //   });
  // }


  onSubmit() {
    this.submitted = true;
    if (this.addEditAdminForm.valid) {
      let res = this.addEditAdminForm.value;
      let obj = {
        id: this.id,
        data: {
          user_firstName: res.user_firstName,
          user_lastName: res.user_lastName,
          user_roleId: res.user_roleId,
          user_phoneNumber: res.user_phoneNumber,
          user_email: res.user_email,
          user_password: res.user_password && res.user_password != '' ? res.user_password : ''
        }
      };
      Helpers.setLoading(true)

      this.stateSubscription = this.store.dispatch(new adminActions.UpdateAdmin(obj))

      this.stateSubscription = this.store.pipe(select(fromAdmin.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();
            Helpers.setLoading(false);
            this.router.navigate(['/admin/admin-management/list'])
          } else {
            Helpers.setLoading(false);

            this.toastr.error(data['message']);
            this.stateSubscription.unsubscribe();

          }
        }
      });
    }
  }

  onkeyUp(e) {
    const form = this.addEditAdminForm;

    if (e && e != '') {
      form.get('user_password').setValidators(Validators.required);
      form.get('user_password').updateValueAndValidity();

      form.get('user_password').setValidators(Validators.pattern(validataion.passwordRegEx));
      form.get('user_password').updateValueAndValidity();
    } else {
      form.get('user_password').clearValidators();
      form.get('user_password').updateValueAndValidity();
    }
  }

}

