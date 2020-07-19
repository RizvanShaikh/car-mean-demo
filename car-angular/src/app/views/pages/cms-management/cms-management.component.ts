import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';
@Component({
  selector: 'kt-cms-management',
  templateUrl: './cms-management.component.html',
  styleUrls: ['./cms-management.component.scss']
})
export class CmsManagementComponent implements OnInit {

  constructor(private subheaderService: SubheaderService,    titleService: Title) {
    this.subheaderService.setTitle(subHeader.CMS);
    titleService.setTitle(titles.cmsManagement);
   }

  ngOnInit() {
  }

}
