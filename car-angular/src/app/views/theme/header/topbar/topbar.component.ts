// Angular
import { Component } from '@angular/core';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent { 


	languages:any = [
		{
			lang: 'EN',
			name: 'English',
			flag: './assets/media/flags/ENGLISH.svg'
		},
		{
			lang: 'AR',
			name: 'Arabic',
			flag: './assets/media/flags/ARABIC.svg'
		}
		
	];
}
