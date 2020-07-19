import { Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, ViewRef } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout/services/subheader.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../../helper/page.title';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { validataion } from '../../../../helper/regular.expression';
import { Store, State, select } from "@ngrx/store";


import * as adminActions from "../../admin-management/state/admin.actions";
import * as fromAdmin from "../../admin-management/state/admin reducer";

import { Helpers } from '../../../../helper/helper';
// import { RolesService } from '../../roles/roles.service';

@Component({
  selector: 'kt-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  isAdd: Boolean = false;
  submitted: Boolean = false;
  id: any;
  stateSubscription: any;
  url: any = '../../../../../assets/media/newMedia/add.png';
  imageFile: any;
  roles: any = [];

  constructor(private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private _route: ActivatedRoute,
    private dtr: ChangeDetectorRef,
    private store: Store<any>,
    titleService: Title,
  ) {
    // this.subheaderService.setTitle(subHeader.PROFILE);
    // titleService.setTitle(titles.profileManage);


  }

  ngOnInit() {
    this.buildEditProfileForm();
    // this.getRoleDetails();

    let user = this.localStorageService.getCurruntUser();
    if (user && user != null) {
      this.id = user && user._id ? user._id : '';
      this.getProfileDetail();

    }

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


  buildEditProfileForm() {
    this.editProfileForm = this._formBuilder.group({
      user_firstName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]],
      user_lastName: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength), Validators.pattern(validataion.nameRegEx)]], user_phoneNumber: ["", [Validators.required, Validators.pattern(validataion.phoneRegEx)]],
      user_email: ["", [Validators.required, Validators.pattern(validataion.emailRegEx)]],
      user_confirm_password: ['', [Validators.pattern(validataion.emailRegEx)]],
      user_password: ['', [Validators.pattern(validataion.emailRegEx)]],
      user_roleId: ["", [Validators.required]],
    });
  }

  onkeyUp(e) {
    const form = this.editProfileForm;

    if (e && e != '') {
      form.get('user_password').setValidators([Validators.required, Validators.pattern(validataion.passwordRegEx)]);
      form.get('user_password').updateValueAndValidity();

      form.get('user_confirm_password').setValidators([Validators.required, Validators.pattern(validataion.passwordRegEx)]);
      form.get('user_confirm_password').updateValueAndValidity();


    } else {
      form.get('user_password').clearValidators();
      form.get('user_password').updateValueAndValidity();
      form.get('user_confirm_password').clearValidators();
      form.get('user_confirm_password').updateValueAndValidity();
    }
  }


  getProfileDetail() {

    Helpers.setLoading(true);

    this.stateSubscription = this.store.dispatch(new adminActions.LoadAdmin(this.id));

    this.stateSubscription = this.store.pipe(select(fromAdmin.selectPageState)).subscribe(async (data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          let result = await data['data'];

          let fd = {
            user_firstName: result.user_firstName,
            user_lastName: result.user_lastName,
            user_roleId: result.user_roleId,
            user_email: result.user_email,
            user_phoneNumber: result.user_phoneNumber
          };
          await this.editProfileForm.patchValue(fd);
          if (result.user_profileImage && result.user_profileImage != null) {
            Helpers.setLoading(false);
            this.url = result.user_profileImage;

            if (this.dtr && !(this.dtr as ViewRef).destroyed) {
              this.dtr.detectChanges();
            }
          } else {
            Helpers.setLoading(false);
          }

          this.stateSubscription.unsubscribe();

        } else {
          Helpers.setLoading(false);

          this.toastr.error(data['message']);
        }
      }
    });
  }

  onSelectFile(event) {

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].name.match(/\.(png|jpeg|jpg)$/) && event.target.files[0].size < 4194304) {
        Helpers.setLoading(true);
        this.imageFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          Helpers.setLoading(false);
          this.url = reader.result;
          this.dtr.detectChanges();

        };
      } else {
        this.toastr.error('you can upload only jpg,png,jpeg extension file max 4 MB');
      }
    }
  }
  imageRemove() {
    this.url = '../../../../../assets/media/newMedia/add.png';
  }

  onSubmit() {
    this.submitted = true;


    if (this.editProfileForm.valid) {
      let res = this.editProfileForm.value;

      if (res.user_password && res.user_password != '' && res.user_confirm_password && res.user_confirm_password != '') {
        if ((res.user_password === res.user_confirm_password)) {
          this.uploadData();
        } else {
          this.toastr.error('Password & Confirm Password Should be Match')
        }
      } else {
        this.uploadData();
      }

    }
  }

  uploadData() {
    Helpers.setLoading(true);
    if (this.url.length > 300) {
      let obj = {
        updType: 'image',
        updDocs: this.imageFile
      };
      this.stateSubscription = this.store.dispatch(new adminActions.UploadData(obj));
      this.stateSubscription = this.store.pipe(select(fromAdmin.selectPageState)).subscribe(async (data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {
            this.url = data['data'].url;
            this.stateSubscription.unsubscribe();
            this.saveData()

          } else {
            Helpers.setLoading(false);
            this.stateSubscription.unsubscribe();

          }
        }
      })
    } else {
      this.saveData()
    }

  }


  saveData() {
    let res = this.editProfileForm.value;

    let obj = {
      id: this.id,
      data: {
        user_firstName: res.user_firstName,
        user_lastName: res.user_lastName,
        user_roleId: res.user_roleId,
        user_email: res.user_email,
        user_phoneNumber: res.user_phoneNumber,
        user_password: res.user_password && res.user_password != '' ? res.user_password : ''
      }
    };
    if (this.url != '../../../../../assets/media/newMedia/add.png') {
      obj.data['user_profileImage'] = this.url;
    }
    this.stateSubscription = this.store.dispatch(new adminActions.UpdateAdmin(obj));
    this.stateSubscription = this.store.pipe(select(fromAdmin.selectPageState)).subscribe(async (data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          Helpers.setLoading(false);
          let result = data['data'];
          let obj = {
            _id: result._id,
            user_profileImage: result.user_profileImage && result.user_profileImage != null ? result.user_profileImage : '',
            user_firstName: result.user_firstName,
            user_lastName: result.user_lastName,
            user_isdCode: result.user_isdCode,
            user_phoneNumber: result.user_phoneNumber,
            user_roleId: result.user_roleId,
            user_email: result.user_email,
            user_status: result.user_status,
            user_countryId: result.user_countryId,
          }
          this.localStorageService.setCurruntUser(obj)

          if (this.stateSubscription && this.stateSubscription != undefined) {
            this.stateSubscription.unsubscribe();
          }
          this.router.navigate(['/admin/dashboard'])

        } else {
          Helpers.setLoading(false);
          this.toastr.error(data['message']);
          this.stateSubscription.unsubscribe();

        }
      }
    })
  }

}
