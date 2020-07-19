import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';

@Component({
  selector: 'kt-contact-us-management',
  templateUrl: './contact-us-management.component.html',
  styleUrls: ['./contact-us-management.component.scss']
})
export class ContactUsManagementComponent implements OnInit {


  constructor(private subheaderService: SubheaderService, titleService: Title) {
    this.subheaderService.setTitle(subHeader.CONTACT);
    titleService.setTitle(titles.contactUs);
  }

  ngOnInit() {
  }

}
