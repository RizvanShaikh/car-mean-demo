import { Component, OnInit, ChangeDetectorRef, ViewRef } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout/services/subheader.service'
import { ScriptLoaderService } from '../../../../services/script-loader.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../../helper/page.title';
import { ApiURIs } from '../../../../../api-constants';
import { Store, select } from "@ngrx/store";
import { ToastrService } from 'ngx-toastr';
import { Helpers } from '../../../../helper/helper';
import { validataion } from '../../../../helper/regular.expression';

import * as contactUsActions from "../state/contact-us.actions";
import * as fromConatctUs from "../state/contact-us.reducer";

function _window(): any {
  // return the global native browser window object
  return window;
}
declare const $: any;

@Component({
  selector: 'kt-contact-us-list',
  templateUrl: './contact-us-list.component.html',
  styleUrls: ['./contact-us-list.component.scss']
})
export class ContactUsListComponent implements OnInit {

  role: any = '';
  stateSubscription: any;
  id: any;
  message: any = '';

  constructor(
    private subheaderService: SubheaderService,
    public localStorageService: LocalstorageService,
    private _script: ScriptLoaderService,
    private router: Router,
    private dtr: ChangeDetectorRef,
    private toastr: ToastrService,
    private store: Store<any>,
    titleService: Title,
  ) {
    this.subheaderService.setTitle(subHeader.CONTACT);
    titleService.setTitle(titles.contactUs);
  }

  ngOnInit() {
    _window().my = _window().my || {};
    _window().my.notimgmt = _window().my.notimgmt || {};
    _window().my.notimgmt.edit = this.edit.bind(this);
    _window().my.notimgmt.delete = this.delete.bind(this);

    if (typeof (_window().isScriptLoadednotimgmt) == 'undefined') {
      _window().isScriptLoadednotimgmt = false;
    }
  }

  ngAfterViewInit() {

    const that = this;
    let scripts = [];
    if (!_window().isScriptLoadednotimgmt) {
      scripts = ['assets/js/global/datatable/plugins.bundle.js', 'assets/js/global/dttable/datatables.bundle.js'];
    }

    this._script.loadScripts('kt-contact-us-list', scripts).then(function () {
      _window().isScriptLoadednotimgmt = true;


      // begin first table
      var table = $('#kt_datatable').DataTable({
        responsive: false, // for table responsive
        searchDelay: 500,
        processing: true,
        //colReorder: true, // for column reorder
        order: [],
        serverSide: true,
        oLanguage: {
          sProcessing: 'Contact Us keeps processing...',
        },

        //   // Pagination settings
        dom: `<'row'<'col-sm-12'tr>>
              <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        ajax: {

          url: ApiURIs.listContacts,
          type: 'POST',
          headers: {
            'Authorization': that.localStorageService.getToken(),
          },
          'dataFilter': function (data) {
            const json = $.parseJSON(data);

            if (json['code'] === 200) {
              console.log(json.data, "json data")
              json.recordsTotal = json.data.totalDocs;
              json.recordsFiltered = json.data.totalDocs;
              json.data = json.data.docs;
            } else if (json['code'] === 401 || json['code'] === 500 || json['code'] === 403) {
              that.router.navigate(['login']);
            }
            return JSON.stringify(json);
          }
        },

        columns: [
          {
            title: 'Sr.No.',
            data: null
          },
          { title: 'Full Name', data: 'contactus_fullName' },
          { title: 'Phone Number', data: 'contactus_phoneNumber' },
          { title: 'Message', data: 'contactus_message' },
          { title: 'Created Date', data: 'contactus_createdOn' },
          { title: 'Actions' },
        ], // 6

        initComplete: function () {

          var rowFilter = $('<tr class="filter"></tr>').appendTo($(table.table().header()));

          this.api().columns().every(function () {

            const column = $(this.header()).text().trim();
            var input;
            switch (column) {
              case 'Sr. No':
                break;
              case 'Full Name':
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;
              case 'Phone Number':
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;
              case 'Message':
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;

              case 'Created Date':
                break;
              case 'Actions':
                var search = $(`<button class="btn btn-brand kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-search"></i>
                        <span>Search</span>
                      </span>
                    </button>`);

                var reset = $(`<button class="btn btn-secondary kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-close"></i>
                        <span>Reset</span>
                      </span>
                    </button>`);

                $('<th>').append(search).append(reset).appendTo(rowFilter);

                $(search).on('click', function (e) {
                  e.preventDefault();
                  var params = {};
                  $(rowFilter).find('.kt-input').each(function () {
                    var i = $(this).data('col-index');
                    if (params[i]) {
                      params[i] += '|' + $(this).val();
                    }
                    else {
                      params[i] = $(this).val();
                    }
                  });

                  $.each(params, function (i, val) {
                    // apply search params to datatable
                    table.column(i).search(val ? val : '', false, false);
                  });
                  table.table().draw();
                });

                $(reset).on('click', function (e) {
                  e.preventDefault();
                  $(rowFilter).find('.kt-input').each(function (i) {
                    $(this).val('');
                    table.column($(this).data('col-index')).search('', false, false);
                  });
                  table.table().draw();
                });
                break;
            }

            if (column !== 'Actions') {
              $(input).appendTo($('<th>').appendTo(rowFilter));
            }
          });
        },
        //     '<a class="btn btn-hover-brand btn-icon btn-pill" href="javascript:;" id="btnEdit" data-id="' + id + '" onclick="window.my.notimgmt.edit(this)" title="Edit details">\
        //     <i class="la la-edit"></i> </a>\ <a href="javascript:;" id="btnDelete" data-id="' + id + '" onclick="window.my.notimgmt.delete(this)" data-toggle="modal" data-target="#m_modal_6"  class="btn btn-hover-danger btn-icon btn-pill" title="Delete">\
        //     <i class="la la-trash"></i>\
        // </a>'
        columnDefs: [{
          targets: -1,
          title: 'Actions',
          orderable: !1,
          bSortable: false,
          width: '10%',
          render: function (a, e, t, n) {
            const id = (t._id);
            return '-';

          }
        },
        {
          targets: 0,
          width: '5%',

          render: function (a, e, t, n) {
            return ((n.row + 1) + (n.settings._iDisplayStart));
          }
        },
        {
          targets: 1,
          width: '15%',

          render: function (a, e, t, n) {
            return a;
          }
        },
        {
          targets: 2,
          width: '15%',

          render: function (a, e, t, n) {
            return a;
          }
        },
        {
          targets: 3,
          width: '20%',

          render: function (a, e, t, n) {

            return e === 'display' && a.length > validataion.MESSAGESLENGTH ?
              a.substr(0, validataion.MESSAGESLENGTH) + '&nbsp<a href="javascript:;" data-id="' + a + '" onclick="window.my.notimgmt.edit(this)" >Show more</a' :
              a;
          }
        } ,
        {
          targets: 4,
          width: '15%',

          render: function (a, e, t, n) {
            let date1 = new Date(a);

            let newDate1 = date1.getDate() + '/' + (date1.getMonth() + 1) + '/' + date1.getFullYear();

            return newDate1;
          }
        },
        ],
      });

      //table.colReorder.move( 0, 1 );
      table.on('column-reorder', function (e, settings, details) {

        var headerCell = $(table.column(details.to).header());
        headerCell.addClass('reordered');
        setTimeout(function () {
          headerCell.removeClass('reordered');
        }, 2000);
      });


    })
  }

  edit(e) {
    this.message = $(e).data('id');

    if (this.dtr && !(this.dtr as ViewRef).destroyed) {
      this.dtr.detectChanges();
    }
    $('#m_modal_7').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });

  }

  delete(e) {
    this.id = $(e).data('id');
  }

  exit() {
    this.message = '';
  }

  deleteSure() {
    Helpers.setLoading(true);

    // this.store.dispatch(new contactUsActions.DeleteSchool(this.id));

    this.stateSubscription = this.store.pipe(select(fromConatctUs.selectPageState)).subscribe((data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          this.toastr.success(data['message']);
          const table: any = $('#kt_datatable');
          const schoolTable = table.DataTable();
          Helpers.setLoading(false);
          schoolTable.ajax.reload();

          this.stateSubscription.unsubscribe();

        } else {
          Helpers.setLoading(false);

          this.toastr.error(data['message']);
        }
      }
    });
  }


}
