import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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

import * as cmsActions from "../state/cms.actions";
import * as fromCMS from "../state/cms.reducer";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import MathType from '@wiris/mathtype-ckeditor5';

// declare const window: any;
// window.ClassicEditor = ClassicEditor;
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'kt-add-cms',
  templateUrl: './add-edit-cms.component.html',
  styleUrls: ['./add-edit-cms.component.scss']
})
export class AddCmsComponent implements OnInit {
  Editor: any;
  isAdd: Boolean = true;
  addEditCMSForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  CMS_CONST: any

  constructor(private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private dtr: ChangeDetectorRef,
    private store: Store<{ school: any }>,
    titleService: Title,
    private translate: TranslateService
  ) {

    this.CMS_CONST = this.translate.instant('CMS');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.CMS_CONST.ADD);
    titleService.setTitle(APPNAME + " | " + this.CMS_CONST.MODULE_NAME);
  }

  ngOnInit() {
    this.buildAddEditCmsForm();
    this.Editor = ClassicEditor;
  }

  buildAddEditCmsForm() {
    this.addEditCMSForm = this._formBuilder.group({
      cms_type: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_title_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_title_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_content_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_content_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]]
    });
  }


  async onSubmit() {
    this.submitted = true;

    if (this.addEditCMSForm.valid) {
      const form = await this.addEditCMSForm.value;

      Helpers.setLoading(true);// 2020-05-18

      let obj = {
        cms_title: [{
          lang: 'EN',
          title: form.cms_title_en
        }, {
          lang: 'AR',
          title: form.cms_title_ar
        }],
        cms_content: [{
          lang: 'EN',
          title: form.cms_content_en
        }, {
          lang: 'AR',
          title: form.cms_content_ar
        }],
        cms_type: form.cms_type
      };

      this.stateSubscription = this.store.dispatch(new cmsActions.AddCMS(obj))

      this.stateSubscription = this.store.pipe(select(fromCMS.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/cms-management/list'])
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
  selector: 'kt-edit-cms',
  templateUrl: './add-edit-cms.component.html',
  styleUrls: ['./add-edit-cms.component.scss']
})
export class EditCmsComponent implements OnInit {

  isAdd: Boolean = false;
  addEditCMSForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  id: any;
  CMS_CONST: any
  Editor: any;


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

    this.CMS_CONST = this.translate.instant('CMS');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.CMS_CONST.ADD);
    titleService.setTitle(APPNAME + " | " + this.CMS_CONST.MODULE_NAME);
  }


  ngOnInit() {
    this.buildAddEditCmsForm();
    this.getCMSDetails();
    this.Editor = ClassicEditor;
  }

  buildAddEditCmsForm() {
    this.addEditCMSForm = this._formBuilder.group({
      cms_type: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_title_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_title_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_content_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      cms_content_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]]
    });
  }

  getCMSDetails() {
    this.id = this._route.snapshot.params['id'];
    Helpers.setLoading(true);

    this.stateSubscription = this.store.dispatch(new cmsActions.LoadCMS(this.id));

    this.stateSubscription = this.store.pipe(select(fromCMS.selectPageState)).subscribe(async (data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          let result = data['data'];
          let fd = {
            cms_type: result.cms_type,
            cms_title_en: result.cms_title.filter((obj) => obj.lang == "EN")[0].title,
            cms_title_ar: result.cms_title.filter((obj) => obj.lang == "AR")[0].title,
            cms_content_en: result.cms_content.filter((obj) => obj.lang == "EN")[0].title,
            cms_content_ar: result.cms_content.filter((obj) => obj.lang == "AR")[0].title,
          };
          console.log(fd, "fd")
          await this.addEditCMSForm.patchValue(fd);
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
    if (this.addEditCMSForm.valid) {

      const form = this.addEditCMSForm.value;

      Helpers.setLoading(true);


      let obj = {
        id: this.id,
        data: {
          cms_title: [{
            lang: 'EN',
            title: form.cms_title_en
          }, {
            lang: 'AR',
            title: form.cms_title_ar
          }],
          cms_content: [{
            lang: 'EN',
            title: form.cms_content_en
          }, {
            lang: 'AR',
            title: form.cms_content_ar
          }],
          cms_type: form.cms_type
        }
      };

      this.stateSubscription = this.store.dispatch(new cmsActions.UpdateCMS(obj))

      this.stateSubscription = this.store.pipe(select(fromCMS.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/cms-management/list'])

          } else {
            Helpers.setLoading(false);
            this.toastr.error(data['message']);
          }
        }
      });

    }
  }

}

