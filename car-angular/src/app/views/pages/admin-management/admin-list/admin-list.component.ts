import { Component, OnInit } from "@angular/core";
import { SubheaderService } from "../../../../core/_base/layout/services/subheader.service";
import { ScriptLoaderService } from "../../../../services/script-loader.service";
import { LocalstorageService } from "../../../../services/localstorage.service";
import { Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import {
  titles,
  subHeader,
  APPNAME,
  PERMISSIONS,
} from "../../../../helper/page.title";
import { ApiURIs } from "../../../../../api-constants";
import { Store, select } from "@ngrx/store";
import * as adminActions from "../state/admin.actions";
import * as fromAdmin from "../state/admin reducer";
import { ToastrService } from "ngx-toastr";
import { Helpers } from "../../../../helper/helper";
import { TranslateService } from "@ngx-translate/core";
// import { RolesService } from '../../roles/roles.service';

function _window(): any {
  // return the global native browser window object
  return window;
}

declare const $: any;

@Component({
  selector: "kt-admin-list",
  templateUrl: "./admin-list.component.html",
  styleUrls: ["./admin-list.component.scss"],
})
export class AdminListComponent implements OnInit {
  stateSubscription: any;
  id: any;
  status: any = "";
  ADMIN_CONST: any;
  searchObj = {
    field: "user_displayName",
    user_status: "",
    search: "",
  };
  roles: any = [];
  createPermission: boolean = false;
  readPermission: boolean = false;
  deletePermission: boolean = false;
  editPermission: boolean = false;

  constructor(
    private subheaderService: SubheaderService,
    public localStorageService: LocalstorageService,
    private _script: ScriptLoaderService,
    private router: Router,
    private toastr: ToastrService,
    // private roleService: RolesService,
    private store: Store<any>,
    titleService: Title,
    private translate: TranslateService
  ) {
    this.getPermission();

    this.ADMIN_CONST = this.translate.instant("ADMIN");
    this.subheaderService.setTitle(this.translate.instant("MENU.ADMIN"));
    titleService.setTitle(APPNAME + this.translate.instant("MENU.ADMIN"));
  }

  getPermission() {
    this.localStorageService.getBehaviorView().subscribe((data: any) => {
      if (data && data.length) {
        if (this.checkHasPermission(data, PERMISSIONS.ADMIN.CREATE)) {
          this.createPermission = true;
        }
        if (this.checkHasPermission(data, PERMISSIONS.ADMIN.EDIT)) {
          this.editPermission = true;
        }
        if (this.checkHasPermission(data, PERMISSIONS.ADMIN.DELETE)) {
          this.deletePermission = true;
        }
        if (this.checkHasPermission(data, PERMISSIONS.ADMIN.READ)) {
          this.readPermission = true;
        }
      }
    });
  }

  checkHasPermission(data, permissionName) {
    return data.find(function (element) {
      return element == permissionName;
    });
  }

  ngOnInit() {
    // this.getRoleDetails();

    _window().my = _window().my || {};
    _window().my.notimgmt = _window().my.notimgmt || {};
    _window().my.notimgmt.edit = this.edit.bind(this);
    _window().my.notimgmt.delete = this.delete.bind(this);
    _window().my.notimgmt.update = this.update.bind(this);

    if (typeof _window().isScriptLoadednotimgmt == "undefined") {
      _window().isScriptLoadednotimgmt = false;
    }


  }

  // getRoleDetails() {

  //   Helpers.setLoading(true);
  //   this.roleService.getRolesList().subscribe(async (data) => {
  //     if (data['code'] == 200) {
  //       let result = data['data'];
  //       console.log(result);
  //       this.roles = result

  //       Helpers.setLoading(false);
  //     } else {
  //       Helpers.setLoading(false);
  //       this.toastr.error(data['message']);
  //     }
  //   });
  // }


  ngAfterViewInit() {
    const that = this;
    let scripts = [];
    if (!_window().isScriptLoadednotimgmt) {
      scripts = [
        "assets/js/global/datatable/plugins.bundle.js",
        "assets/js/global/dttable/datatables.bundle.js",
      ];
    }
    this._script.loadScripts("kt-admin-list", scripts).then(function () {
      _window().isScriptLoadednotimgmt = true;

      var table = $("#kt_datatable").DataTable({
        responsive: false, // for table responsive
        searchDelay: 500,
        processing: true,
        //colReorder: true, // for column reorder
        order: [],
        serverSide: true,
        oLanguage: {
          sProcessing: that.ADMIN_CONST.MESSAGES.PROCESSING,
        },

        //   // Pagination settings
        dom: `<'row'<'col-sm-12'tr>>
              <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        ajax: {
          url: ApiURIs.listAdmin,
          type: "POST",
          headers: {
            Authorization: that.localStorageService.getToken(),
          },
          dataFilter: function (data) {
            const json = $.parseJSON(data);

            if (json["code"] === 200) {
              json.recordsTotal = json.data.totalDocs;
              json.recordsFiltered = json.data.totalDocs;
              json.data = json.data.docs;
            } else if (
              json["code"] === 401 ||
              json["code"] === 500 ||
              json["code"] === 403
            ) {
              that.router.navigate(["login"]);
            }
            return JSON.stringify(json);
          },
        },

        columns: [
          {
            title: that.ADMIN_CONST.LABEL.SR_NO,
            data: null,
          },
          { title: that.ADMIN_CONST.LABEL.FULLNAME, data: "user_displayName" },
          { title: that.ADMIN_CONST.LABEL.EMAIL, data: "user_email" },
          {
            title: that.ADMIN_CONST.LABEL.PHONE_NUMBER,
            data: "user_phoneNumber",
          },
          { title: that.ADMIN_CONST.LABEL.ROLE, data: "role_name" },
          { title: that.ADMIN_CONST.LABEL.STATUS, data: "user_status" },
          { title: that.ADMIN_CONST.LABEL.CREATED_ON, data: "user_createdOn" },

          { title: that.ADMIN_CONST.LABEL.ACTIONS },
        ],

        initComplete: function () {
          var rowFilter = $('<tr class="filter"></tr>').appendTo(
            $(table.table().header())
          );

          this.api()
            .columns()
            .every(function () {
              const column = $(this.header()).text().trim();
              var input;
              switch (column) {
                case that.ADMIN_CONST.LABEL.SR_NO:
                  break;
                case that.ADMIN_CONST.LABEL.FULLNAME:
                  input = $(
                    `<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` +
                    this.index() +
                    `"/>`
                  );
                  break;
                case that.ADMIN_CONST.LABEL.EMAIL:
                  input = $(
                    `<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` +
                    this.index() +
                    `"/>`
                  );
                  break;
                case that.ADMIN_CONST.LABEL.PHONE_NUMBER:
                  input = $(
                    `<input type="text" class="form-control form-control-sm form-filter kt-input" data-col-index="` +
                    this.index() +
                    `"/>`
                  );
                  break;
                case that.ADMIN_CONST.LABEL.ROLE:
                  let option = '<option value="">' + that.ADMIN_CONST.PLACEHOLDERS.ROLE + '</option>';
                  if (that.roles.length) {
                    that.roles.map((x) => {
                      let tag = '<option value="' + x.role_name + '">' + x.role_name + '</option>';
                      option = option + tag;
                    })
                  }
                  input = $(
                    `<select class="form-control form-control-sm form-filter kt-input" title="Select" data-col-index="` +
                    this.index() +
                    '">' + option + '</select>'
                  );
                  break;
                case that.ADMIN_CONST.LABEL.STATUS:
                  input = $(
                    `<select class="form-control form-control-sm form-filter kt-input" title="Select" data-col-index="` +
                    this.index() +
                    `">
                          <option value="">${that.ADMIN_CONST.PLACEHOLDERS.STATUS}</option>
                          <option value="ACTIVE">Active</option>
                          <option value="INACTIVE">Inactive</option></select>
                          `
                  );
                  break;
                case that.ADMIN_CONST.LABEL.CREATED_ON:
                  break;
                case that.ADMIN_CONST.LABEL.ACTIONS:
                  var search = $(`<button class="btn btn-brand kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-search"></i>
                        <span>${that.ADMIN_CONST.BUTTONS.SEARCH}</span>
                      </span>
                    </button>`);

                  var reset = $(`<button class="btn btn-secondary kt-btn btn-sm kt-btn--icon" style="display: inline-block !important;
                margin-left: 10px !important; margin-top: 0px !important;">
                      <span>
                        <i class="la la-close"></i>
                        <span>${that.ADMIN_CONST.BUTTONS.RESET}</span>
                      </span>
                    </button>`);

                  $("<th>").append(search).append(reset).appendTo(rowFilter);

                  $(search).on("click", function (e) {
                    e.preventDefault();
                    var params = {};
                    $(rowFilter)
                      .find(".kt-input")
                      .each(function () {
                        var i = $(this).data("col-index");
                        if (params[i]) {
                          params[i] += "|" + $(this).val();
                        } else {
                          params[i] = $(this).val();
                        }
                      });

                    $.each(params, function (i, val) {
                      // apply search params to datatable
                      table.column(i).search(val ? val : "", false, false);
                    });
                    table.table().draw();
                  });

                  $(reset).on("click", function (e) {
                    e.preventDefault();
                    $(rowFilter)
                      .find(".kt-input")
                      .each(function (i) {
                        $(this).val("");
                        table
                          .column($(this).data("col-index"))
                          .search("", false, false);
                      });
                    table.table().draw();
                  });
                  break;
              }

              if (column !== that.ADMIN_CONST.LABEL.ACTIONS) {
                $(input).appendTo($("<th>").appendTo(rowFilter));
              }
            });
        },

        columnDefs: [
          {
            targets: -1,
            title: "Actions",
            orderable: !1,
            bSortable: false,
            width: "10%",
            render: function (a, e, t, n) {
              const id = t._id;
              let editBtn =
                '<a class="btn btn-hover-brand btn-icon btn-pill" href="javascript:;" id="btnEdit" data-id="' +
                id +
                '" onclick="window.my.notimgmt.edit(this)" title="Edit details">\
                            <i class="la la-edit"></i> </a>\
                          ';
              let deleteBtn =
                '<a href="javascript:;" id="btnDelete" data-id="' +
                id +
                '" onclick="window.my.notimgmt.delete(this)" data-toggle="modal" data-target="#m_modal_6"  class="btn btn-hover-danger btn-icon btn-pill" title="Delete">\
                              <i class="la la-trash"></i>\
                            </a>';
              if (that.editPermission && that.deletePermission) {
                return editBtn + deleteBtn;
              } else if (that.editPermission) {
                return editBtn;
              } else if (that.deletePermission) {
                return deleteBtn;
              } else {
                return "-";
              }
            },
          },

          {
            targets: 0,
            width: "10%",

            render: function (a, e, t, n) {
              return n.row + 1 + n.settings._iDisplayStart;
            },
          },
          {
            targets: 1,
            width: "10%",

            render: function (a, e, t, n) {
              if (t.firstName == '' && t.lastName == '') {
                return '-';
              } else {
                return t.firstName + ' ' + t.lastName;
              }
            },
          },
          {
            targets: 2,
            width: "10%",
            render: function (a, e, t, n) {
              return a;
            },
          },
          {
            targets: 3,
            width: "10%",

            render: function (a, e, t, n) {
              return a;
            },
          },
          {
            targets: 4,
            width: "10%",

            render: function (a, e, t, n) {
              return a;
            },
          },
          {
            targets: 5,
            width: "10%",
            render: function (value, e, row, n) {
              // return status || '-';
              let id = row._id;
              var status = {
                INACTIVE: { title: "Inactive", class: "kt-badge--danger" },
                ACTIVE: { title: "Active", class: "kt-badge--success" },
              };

              return (
                '<span style="cursor:Pointer" onclick="window.my.notimgmt.update(this)"  data-id="' +
                id +
                '" data-status="' +
                value +
                '" data-toggle="modal"  class="kt-badge ' +
                status[row.user_status].class +
                ' kt-badge--inline kt-badge--pill">' +
                status[row.user_status].title +
                "</span>"
              );
            },
          },
          {
            targets: 6,
            width: "10%",

            render: function (a, e, t, n) {
              let date1 = new Date(a);

              let newDate1 =
                date1.getDate() +
                "/" +
                (date1.getMonth() + 1) +
                "/" +
                date1.getFullYear();

              return newDate1;
            },
          },
        ],
      });
    });
  }
  delete(e) {
    this.id = $(e).data("id");
  }
  update(e) {
    this.id = $(e).data("id").toString();
    this.status = $(e).data("status");
    $("#m_modal_7").modal({
      backdrop: "static",
      keyboard: false,
      show: true,
    });
  }

  deleteSure() {
    Helpers.setLoading(true);

    this.store.dispatch(new adminActions.DeleteAdmin(this.id));

    this.stateSubscription = this.store
      .pipe(select(fromAdmin.selectPageState))
      .subscribe((data) => {
        if (data && data != undefined) {
          if (data["code"] == 200) {
            this.toastr.success(data["message"]);
            const table: any = $("#kt_datatable");

            const adminTable = table.DataTable();
            Helpers.setLoading(false);
            adminTable.ajax.reload();

            this.stateSubscription.unsubscribe();
          } else {
            this.toastr.error(data["message"]);
          }
        }
      });
  }

  edit(e) {
    this.id = $(e).data("id");
    this.router.navigate(["admin/admin-management/edit/" + this.id]);
  }

  updateStatus() {
    let obj = {
      data: {
        user_status:
          this.status && this.status != undefined && this.status == "ACTIVE"
            ? "INACTIVE"
            : "ACTIVE",
      },
      id: this.id,
    };

    Helpers.setLoading(true);

    this.store.dispatch(new adminActions.UpdateStatus(obj));

    this.stateSubscription = this.store
      .pipe(select(fromAdmin.selectPageState))
      .subscribe((data) => {
        if (data && data != undefined) {
          $("#m_modal_7").modal("hide");

          if (data["code"] == 200) {
            this.toastr.success(data["message"]);
            const table: any = $("#kt_datatable");
            const adminTable = table.DataTable();
            Helpers.setLoading(false);

            adminTable.ajax.reload();
            this.stateSubscription.unsubscribe();
            // data-dismiss="modal"
          } else {
            Helpers.setLoading(false);

            this.toastr.error(data["message"]);
          }
        }
      });
  }
}
