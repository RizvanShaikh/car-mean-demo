import { Component, OnInit, ChangeDetectorRef, ViewRef, Input, Output, EventEmitter } from '@angular/core';

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

import * as templateActions from "../state/template.actions";
import * as fromTemplate from "../state/template.reducer"
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { TranslateService } from '@ngx-translate/core';
// import { CountryService } from '../../country/country.service';
// import { CityService } from '../../city/city.service';
import { template } from 'lodash';

@Component({
  selector: 'kt-add-edit-template',
  templateUrl: './add-edit-template.component.html',
  styleUrls: ['./add-edit-template.component.scss']
})
export class AddTemplateComponent implements OnInit {

  Editor: any;
  isAdd: Boolean = true;
  addEditTemplateForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  TEMPLATE_CONST: any;
  id: any;
  countries: any = [];
  cities = [];
  countryCities = [];
  email: string = 'Email';
  sms: string = 'SMS';
  notification: string = 'Notification';
  //variable declared  yt
  dropdownList = [];
  selectedItemsCountry = [];
  selectedItemsCity = [];
  city_countryId = [];


  dropdownSettingsCountry = {};
  dropdownSettingsCity = {};
  // yt
  checkedCities: any[];
  currentSelected: {};

  selectedOption: string;
  printedOption: string;

  val: string
  states: any;

  options = [
    { name: "Select Type", value: '' },
    { name: "Email", value: 'Email' },
    { name: "SMS", value: 'SMS' },
    { name: "Notification", value: 'Notification' }
  ]

  print() {
    this.printedOption = this.selectedOption;
 
    if (this.printedOption == "Notification") {
      this.val = "Notification"
    } else if (this.printedOption == "SMS") {
      this.val = "SMS"
    } else if (this.printedOption == "Email") {
      this.val = "Email"
    } else {
      this.val = " "
    }
  }

  constructor(
    private subheaderService: SubheaderService,
    private _formBuilder: FormBuilder,
    private router: Router,
    public localStorageService: LocalstorageService,
    private toastr: ToastrService,
    private dtr: ChangeDetectorRef,
    private store: Store<{ school: any }>,
    titleService: Title,
    private translate: TranslateService,
    // private countryService: CountryService,
    // private cityService: CityService
  ) {
    this.TEMPLATE_CONST = this.translate.instant('TEMPLATE');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.TEMPLATE_CONST.ADD);
    titleService.setTitle(APPNAME + " | " + this.TEMPLATE_CONST.MODULE_NAME);

    this.checkedCities = [];
  }
  // check box----------
  ngOnInit() {
    this.buildAddEditTemplateForm();
    // this.getAllCountries();
    // this.getAllCities();
    // this.Editor = ClassicEditor;
    this.selectedItemsCountry = [];
    this.selectedItemsCity = [];

    this.dropdownSettingsCountry = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "dropdown"
    };
    this.dropdownSettingsCity = {
      singleSelection: false,
      text: "Select Cities",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "dropdown"
    };
  }
  //yt
  onItemCountrySelect(item: any) {
  
    this.selectedItemsCountry.forEach(data => {
      this.city_countryId.push(data.id);
    });

    // this.cityService.getCountryCities({ city_countryId: this.city_countryId }).subscribe(async (data) => {
    //   if (data && data != undefined) {
    //     if (data['code'] == 200) {
    //       console.log('--------------------Cities', data['data']);
    //       data['data'].forEach(element => {
    //         this.countryCities.push({
    //           id: element._id,
    //           itemName: element.city_name
    //         })
    //       });
    //     } else {
    //       Helpers.setLoading(false);
    //       this.toastr.error(data['message']);
    //     }
    //   }
    // });
  }
  // onItemCountryDeSelect(item: any) {
  // console.log("country de select")
  //   this.cityService.getCountryCities({ city_countryId: this.city_countryId }).subscribe(async (data) => {
  //     if (data && data != undefined) {
  //       if (data['code'] == 200) {
  //         console.log('--------------------Cities', data['data']);
  //         data['data'].forEach(element => {
  //           this.countryCities.pop()
  //         });
  //       } else {
  //         Helpers.setLoading(false);
  //         this.toastr.error(data['message']);
  //       }
  //     }
  //   });
  // }
  onCountrySelectAll(items: any) {
    console.log('onSelectAll', items);
    
  }
  onCountryDeSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onItemCitySelect(item: any) {
    console.log('onItemSelect', item);
    console.log(this.selectedItemsCity);
  }
  onItemCityDeSelect(item: any) {
    console.log('onItemSelect', item);
    console.log(this.selectedItemsCity);
  }
  onCitySelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onCityDeSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  //
  buildAddEditTemplateForm() {
    this.addEditTemplateForm = this._formBuilder.group({
      template_title_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_title_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_content_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_content_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_code: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_slug: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_isCountrySpecific: ["", [Validators.required]],
      template_countryId: [""],
      template_cityId: [""],
      template_type: ["", [Validators.required]],
    });
  }

  // getAllCountries() {
  //   Helpers.setLoading(true);
  //   this.countryService.getAllCountries().subscribe(async (data) => {
  //     if (data && data != undefined) {
  //       if (data['code'] == 200) {
  //         console.log('--------------------Countries', data['data']);
      
  //         data['data'].forEach(element => {
  //           this.countries.push({
  //             id: element._id,
  //             itemName: element.country_name
  //           })
  //         });
  //         if (this.dtr && !(this.dtr as ViewRef).destroyed) {
  //           this.dtr.detectChanges();
  //         }
  //         Helpers.setLoading(false);
      
  //       } else {
  //         Helpers.setLoading(false);
  //         this.toastr.error(data['message']);
  //       }
  //     }
  //   });
  // }

  // getAllCities() {
  //   Helpers.setLoading(true);
  //   this.cityService.getAllCities().subscribe(async (data) => {
  //     if (data && data != undefined) {
  //       if (data['code'] == 200) {
  //         console.log('--------------------Cities', data['data']);
  //         data['data'].forEach(element => {
  //           this.cities.push({
  //             id: element._id,
  //             itemName: element.city_name
  //           })
  //         });

  //         if (this.dtr && !(this.dtr as ViewRef).destroyed) {
  //           this.dtr.detectChanges();
  //         }
  //         Helpers.setLoading(false);
  //       } else {
  //         Helpers.setLoading(false);
  //         this.toastr.error(data['message']);
  //       }
  //     }
  //   });
  // }

  async onSubmit() {
    this.submitted = true;
    if (this.addEditTemplateForm.valid) {
      let citiesArray = [];
      let countryArray = [];
      const form = await this.addEditTemplateForm.value;
      Helpers.setLoading(true);
      form.template_countryId.forEach(element => {
        countryArray.push(element.id)
      });
      form.template_cityId.forEach(element => {
        citiesArray.push(element.id)
      });
      let obj = {
        template_title: [{
          lang: 'EN',
          title: form.template_title_en
        }, {
          lang: 'AR',
          title: form.template_title_ar
        }],
        template_content: [{
          lang: 'EN',
          title: form.template_content_en
        }, {
          lang: 'AR',
          title: form.template_content_ar
        }],
        template_code: form.template_code,
        template_slug: form.template_slug,
        template_isCountrySpecific: form.template_isCountrySpecific,
        template_countryId: countryArray,
        template_cityId: citiesArray,
        template_type: form.template_type
      };
      this.stateSubscription = this.store.dispatch(new templateActions.AddTemplate(obj))

      this.stateSubscription = this.store.pipe(select(fromTemplate.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/template/list'])
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
  selector: 'kt-add-edit-template',
  templateUrl: './add-edit-template.component.html',
  styleUrls: ['./add-edit-template.component.scss']
})

export class EditTemplateComponent implements OnInit {
 
  Editor: any;
  isAdd: Boolean = false;
  addEditTemplateForm: FormGroup;
  submitted: Boolean = false;
  stateSubscription: any;
  elements: any = false;
  id: any;
  TEMPLATE_CONST: any;

  countries: any = [];
  cities = [];
  countryCities = [];
  email: string = 'Email';
  sms: string = 'SMS';
  notification: string = 'Notification';
  //variable declared  yt
  dropdownList = [];
  selectedItemsCountry = [];
  selectedItemsCity = [];
  city_countryId = [];

  dropdownSettingsCountry = {};
  dropdownSettingsCity = {};
  // yt
  checkedCities: any[];
  currentSelected: {};

  selectedOption: string;
  printedOption: string;

  val: string
  states: any;


  options = [
    { name: "Select Type", value: '' },
    { name: "Email", value: 'Email' },
    { name: "SMS", value: 'SMS' },
    { name: "Notification", value: 'Notification' }
  ]

  print() {
    this.printedOption = this.selectedOption;
    
    if (this.printedOption == "Notification") {
      this.val = "Notification"
    } else if (this.printedOption == "SMS") {
      this.val = "SMS"
    } else if (this.printedOption == "Email") {
      this.val = "Email"
    } else {
      this.val = " "
    }
  }

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
    // private countryService: CountryService,
    // private cityService: CityService
  ) {

    this.TEMPLATE_CONST = this.translate.instant('TEMPLATE');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.TEMPLATE_CONST.ADD);
    titleService.setTitle(APPNAME + " | " + this.TEMPLATE_CONST.MODULE_NAME);
  }


  ngOnInit() {
    this.buildAddEditTemplateForm();
    this.getTemplateDetails();
    // this.getAllCountries();
    this.Editor = ClassicEditor;
    this.selectedItemsCountry = [];
    this.selectedItemsCity = [];

    this.dropdownSettingsCountry = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "dropdown"
    };
    this.dropdownSettingsCity = {
      singleSelection: false,
      text: "Select Cities",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "dropdown"
    };
  }
   //yt
   onItemCountrySelect(item: any) {
   console.log(this.selectedItemsCountry);

    this.selectedItemsCountry.forEach(data => {
      this.city_countryId.push(data.id);
    });
    // this.cityService.getCountryCities({ city_countryId: this.city_countryId }).subscribe(async (data) => {
    //   if (data && data != undefined) {
    //     if (data['code'] == 200) {
    //       console.log('--------------------Cities', data['data']);
    //       data['data'].forEach(element => {
    //         this.countryCities.push({
    //           id: element._id,
    //           itemName: element.city_name
    //         })
    //       });
    //     } else {
    //       Helpers.setLoading(false);
    //       this.toastr.error(data['message']);
    //     }
    //   }
    // });
  }
  // onItemCountryDeSelect(item: any) {
  //   console.log(this.selectedItemsCountry);
  //   this.cityService.getCountryCities({ city_countryId: this.city_countryId }).subscribe(async (data) => {
  //     if (data && data != undefined) {
  //       if (data['code'] == 200) {
  //         console.log('--------------------Cities', data['data']);
  //         data['data'].forEach(element => {
  //           this.countryCities.pop()
  //         });
  //       } else {
  //         Helpers.setLoading(false);
  //         this.toastr.error(data['message']);
  //       }
  //     }
  //   });
  // }
  onCountrySelectAll(items: any) {
    console.log('onSelectAll', items);
    
  }
  onCountryDeSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onItemCitySelect(item: any) {
    console.log('onItemSelect', item);
    console.log(this.selectedItemsCity);
  }
  onItemCityDeSelect(item: any) {
    console.log('onItemSelect', item);
    console.log(this.selectedItemsCity);
  }
  onCitySelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  onCityDeSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  buildAddEditTemplateForm() {
    this.addEditTemplateForm = this._formBuilder.group({
      template_title_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_title_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_content_en: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_content_ar: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_code: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_slug: ["", [Validators.required, Validators.minLength(validataion.nameMinLength), Validators.maxLength(validataion.nameMaxLength)]],
      template_isCountrySpecific: ["", [Validators.required]],
      template_countryId: [""],
      template_cityId: [""],
      template_type: ["", [Validators.required]]
    });
  }

// getAllCountries() {
//     Helpers.setLoading(true);
//     this.countryService.getAllCountries().subscribe(async (data) => {
//       if (data && data != undefined) {
//         if (data['code'] == 200) {
  
//           data['data'].forEach(element => {
//             this.countries.push({
//               id: element._id,
//               itemName: element.country_name
//             })
//           });
//           if (this.dtr && !(this.dtr as ViewRef).destroyed) {
//             this.dtr.detectChanges();
//           }
//           Helpers.setLoading(false);
         
//         } else {
//           Helpers.setLoading(false);
//           this.toastr.error(data['message']);
//         }
//       }
//     });
//   }
  
  getTemplateDetails() {
    this.id = this._route.snapshot.params['id'];
    Helpers.setLoading(true);

    this.stateSubscription = this.store.dispatch(new templateActions.LoadTemplate(this.id));

    this.stateSubscription = this.store.pipe(select(fromTemplate.selectPageState)).subscribe(async (data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          let result = data['data'];
        
          let fd = {
            template_title_en: result.template_title.filter((obj) => obj.lang == "EN")[0].title,
            template_title_ar: result.template_title.filter((obj) => obj.lang == "AR")[0].title,
            template_content_en: result.template_content.filter((obj) => obj.lang == "EN")[0].title,
            template_content_ar: result.template_content.filter((obj) => obj.lang == "AR")[0].title,
            template_code: result.template_code,
            template_slug: result.template_slug,
            template_isCountrySpecific: result.template_isCountrySpecific,
            template_countryId: result.template_countryId,
            template_cityId: result.template_cityId,
            template_type: result.template_type
          };
        
          await this.addEditTemplateForm.patchValue(fd);
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
    if (this.addEditTemplateForm.valid) {

      const form = this.addEditTemplateForm.value;

      Helpers.setLoading(true);
      let citiesArray = [];
      let countryArray = [];
      form.template_countryId.forEach(element => {
        countryArray.push(element.id)
      });
      form.template_cityId.forEach(element => {
        citiesArray.push(element.id)
      });

      let obj = {
        id: this.id,
        data: {
          template_title: [{
            lang: 'EN',
            title: form.template_title_en
          }, {
            lang: 'AR',
            title: form.template_title_ar
          }],
          template_content: [{
            lang: 'EN',
            title: form.template_content_en
          }, {
            lang: 'AR',
            title: form.template_content_ar
          }],
          template_code: form.template_code,
          template_slug: form.template_slug,
          template_isCountrySpecific: form.template_isCountrySpecific,
          template_countryId:  countryArray,
          template_cityId: citiesArray,
          template_type: form.template_type
        }
      };

      this.stateSubscription = this.store.dispatch(new templateActions.UpdateTemplate(obj))

      this.stateSubscription = this.store.pipe(select(fromTemplate.selectPageState)).subscribe((data) => {
        if (data && data != undefined) {
          if (data['code'] == 200) {

            Helpers.setLoading(false);
            this.toastr.success(data['message']);
            this.stateSubscription.unsubscribe();

            this.router.navigate(['/admin/template/list'])

          } else {
            Helpers.setLoading(false);
            this.toastr.error(data['message']);
          }
        }
      });
    }
  }
}
