import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';


@Component({
  selector: 'kt-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnInit {

  constructor(
    private subheaderService: SubheaderService, titleService: Title) {
      this.subheaderService.setTitle(subHeader.BUYER);
      titleService.setTitle(titles.buyerManagement);
   }


  ngOnInit() {
  }

}
