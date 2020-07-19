import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../../core/_base/layout/services/subheader.service'
import { ScriptLoaderService } from '../../../../services/script-loader.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { titles, subHeader, APPNAME } from '../../../../helper/page.title';
import { ApiURIs } from '../../../../../api-constants';
import { Store, select } from "@ngrx/store";
import { ToastrService } from 'ngx-toastr';
import { Helpers } from '../../../../helper/helper';
import { TranslateService } from '@ngx-translate/core';

import * as templateActions from "../state/template.actions";
import * as fromTemplate from "../state/template.reducer";

function _window(): any {
  // return the global native browser window object
  return window;
}

declare const $: any;


@Component({
  selector: 'kt-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {

  stateSubscription: any;
  id: any;
  status: any = '';
  APPNAME: String = APPNAME;
  TEMPLATE_CONST: any = [];
  searchObj = { field: 'template_title', template_status: '', search: '' };

  constructor(
    private subheaderService: SubheaderService,
    public localStorageService: LocalstorageService,
    private _script: ScriptLoaderService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<any>,
    titleService: Title,
    public translate: TranslateService
  ) {
    this.TEMPLATE_CONST = this.translate.instant('TEMPLATE');
    // SET SUBHEAD AND TITLE
    this.subheaderService.setTitle(this.translate.instant('MENU.TEMPLATE'));
    titleService.setTitle(this.APPNAME + " | " + this.TEMPLATE_CONST.MODULE_NAME);
  }

  ngOnInit() {
    _window().my = _window().my || {};
    _window().my.notimgmt = _window().my.notimgmt || {};
    _window().my.notimgmt.edit = this.edit.bind(this);
    _window().my.notimgmt.delete = this.delete.bind(this);
    _window().my.notimgmt.update = this.update.bind(this);

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

    this._script.loadScripts('kt-template-list', scripts).then(function () {
      _window().isScriptLoadednotimgmt = true;


      // begin first table
      var table = $(document).find('#kt_datatable').DataTable({
        responsive: false, // for table responsive
        searchDelay: 500,
        processing: true,
        //colReorder: true, // for column reorder
        order: [],
        serverSide: true,
        oLanguage: {
          sProcessing: that.TEMPLATE_CONST.MESSAGES.PROCESSING,
        },

        //   // Pagination settings
        dom: `<'row'<'col-sm-12'tr>>
              <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        ajax: {
          // url: ApiURIs.listTemplate,
          type: 'POST',
          headers: {
            'Authorization': that.localStorageService.getToken(),
          },
          'dataFilter': function (data) {
            const json = $.parseJSON(data);
            if (json['code'] === 200) {
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
            title: that.TEMPLATE_CONST.LABEL.SR_NO, data: null
          },
          { title: that.TEMPLATE_CONST.LABEL.TEMPLATE_TITLE, data: 'template_title' },
          { title: that.TEMPLATE_CONST.LABEL.TEMPLATE_SLUG, data: 'template_slug' },
          { title: that.TEMPLATE_CONST.LABEL.STATUS, data: 'template_status' },
          { title: that.TEMPLATE_CONST.LABEL.CREATED_ON, data: 'template_createdOn' },
          { title: that.TEMPLATE_CONST.LABEL.ACTIONS },
        ],

        initComplete: function () {

          var rowFilter = $('<tr class="filter"></tr>').appendTo($(table.table().header()));

          this.api().columns().every(function () {

            const column = $(this.header()).text().trim();
            var input;
            switch (column) {
              case that.TEMPLATE_CONST.LABEL.SR_NO:
                break;
              case that.TEMPLATE_CONST.LABEL.TEMPLATE_TITLE:
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;
              case that.TEMPLATE_CONST.LABEL.TEMPLATE_SLUG:
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;
              case that.TEMPLATE_CONST.LABEL.STATUS:
                input = $(`<select class="form-control form-control-sm form-filter kt-input" title="Select" data-col-index="` + this.index() + `">
                <option value="">${that.TEMPLATE_CONST.PLACEHOLDERS.STATUS}</option>
                <option value="ACTIVE">${that.TEMPLATE_CONST.LABEL.ACTIVE}</option>
                <option value="INACTIVE">${that.TEMPLATE_CONST.LABEL.INACTIVE}</option></select>
                `);
                break;
              case that.TEMPLATE_CONST.LABEL.CREATED_ON:
                input = $(`<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` + this.index() + `"/>`);
                break;
              case that.TEMPLATE_CONST.LABEL.ACTIONS:
                var search = $(`<button class="btn btn-brand kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-search"></i>
                        <span>${that.TEMPLATE_CONST.BUTTONS.SEARCH}</span>
                      </span>
                    </button>`);

                var reset = $(`<button class="btn btn-secondary kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-close"></i>
                        <span>${that.TEMPLATE_CONST.BUTTONS.RESET}</span>
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

        columnDefs: [{
          targets: -1,
          title: 'Actions',
          orderable: !1,
          bSortable: false,
          width: '10%',
          render: function (a, e, t, n) {
            const id = (t._id);
            return '<a class="btn btn-hover-brand btn-icon btn-pill" href="javascript:;" id="btnEdit" data-id="' + id + '" onclick="window.my.notimgmt.edit(this)" title="Edit details">\
                        <i class="la la-edit"></i> </a>';

          }
        },
        {
          targets: 0,
          width: '10%',

          render: function (a, e, t, n) {
            return ((n.row + 1) + (n.settings._iDisplayStart));
          }
        },
        {
          targets: 1,
          width: '20%',

          render: function (a, e, t, n) {
            let c = a.filter((obj) =>
              (obj.lang == 'EN'))

            return c[0].title;
          }
        },
        {
          targets: 2,
          width: '10%',
          render: function (a, e, t, n) {
            return a;
          }
        },
        {
          targets: 3,
          width: '10%',
          render: function (value, e, row, n) {

            // return status || '-';
            let id = row._id;
            var status = {
              'INACTIVE': { 'title': 'Inactive', 'class': 'kt-badge--danger' },
              'ACTIVE': { 'title': 'Active', 'class': 'kt-badge--success' },
            };
            return '<span style="cursor:Pointer" onclick="window.my.notimgmt.update(this)"  data-id="' + id + '" data-status="' + value + '" data-toggle="modal"  class="kt-badge ' + status[row.template_status].class + ' kt-badge--inline kt-badge--pill">' + status[row.template_status].title + '</span>';
          }
        },
        {
          targets: 4,
          width: '10%',

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
    this.id = $(e).data('id');
    this.router.navigate(['admin/template/edit/' + this.id])
  }

  delete(e) {
    this.id = $(e).data('id');
  }

  update(e) {

    this.id = $(e).data('id').toString();
    this.status = $(e).data('status');
    $('#m_modal_7').modal({
      backdrop: 'static',
      keyboard: false,
      show: true
    });

  }

  deleteSure() {
    Helpers.setLoading(true);

    this.store.dispatch(new templateActions.DeleteTemplate(this.id));

    this.stateSubscription = this.store.pipe(select(fromTemplate.selectPageState)).subscribe((data) => {
      if (data && data != undefined) {
        if (data['code'] == 200) {
          this.toastr.success(data['message']);
          const table: any = $('#kt_datatable');

          const templateTable = table.DataTable();
          Helpers.setLoading(false);

          templateTable.ajax.reload();

          this.stateSubscription.unsubscribe();

        } else {
          Helpers.setLoading(false);

          this.toastr.error(data['message']);
        }
      }
    });
  }

  updateStatus() {
    let obj = {
      data: { template_status: this.status && this.status != undefined && this.status == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
      id: this.id
    };
    Helpers.setLoading(true);

    this.store.dispatch(new templateActions.UpdateStatus(obj));

    this.stateSubscription = this.store.pipe(select(fromTemplate.selectPageState)).subscribe((data) => {
      if (data && data != undefined) {
        $('#m_modal_7').modal('hide');

        if (data['code'] == 200) {

          const table: any = $('#kt_datatable');

          const templateTable = table.DataTable();
          Helpers.setLoading(false);

          templateTable.ajax.reload();

          this.toastr.success(data['message']);

          this.stateSubscription.unsubscribe();

        } else {
          Helpers.setLoading(false);

          this.toastr.error(data['message']);
        }
      }
    });

  }

}
