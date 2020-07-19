import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { titles,subHeader } from '../../../helper/page.title';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'kt-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

  constructor(private subheaderService: SubheaderService,    titleService: Title) {
    this.subheaderService.setTitle(subHeader.ADMIN);
		titleService.setTitle(titles.adminManagement);
  }

  ngOnInit() {
  }

}
