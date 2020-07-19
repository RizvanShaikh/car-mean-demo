import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';

@Component({
  selector: 'kt-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(
    private subheaderService: SubheaderService, titleService: Title) {
      // this.subheaderService.setTitle(subHeader.TEMPLATE);
      // titleService.setTitle(titles.templateManagement);
   }

  ngOnInit() {
  }

}
