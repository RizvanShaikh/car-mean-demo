import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';


@Component({
  selector: 'kt-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {

  constructor(
    private subheaderService: SubheaderService, titleService: Title) {
      this.subheaderService.setTitle(subHeader.PROVIDER);
      titleService.setTitle(titles.providerManagement);
   }


  ngOnInit() {
  }

}
