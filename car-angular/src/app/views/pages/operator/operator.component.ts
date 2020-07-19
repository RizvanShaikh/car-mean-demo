import { Component, OnInit } from '@angular/core';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service'
import { Title } from '@angular/platform-browser';
import { titles, subHeader } from '../../../helper/page.title';

@Component({
  selector: 'kt-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {

  constructor(
    private subheaderService: SubheaderService, titleService: Title) {
      // this.subheaderService.setTitle(subHeader.OPERATOR);
      // titleService.setTitle(titles.operatorManagement);    
  }

  ngOnInit() {
  }

}
