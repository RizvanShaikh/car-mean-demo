import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';

@Component({
  selector: 'kt-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private subheaderService: SubheaderService,    titleService: Title,
    ) {
    // this.subheaderService.setTitle(subHeader.PROFILE);
    // titleService.setTitle(titles.profileManage);
   }

  ngOnInit() {
  }

}
