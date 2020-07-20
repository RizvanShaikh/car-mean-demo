// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';


export interface Breadcrumb {
	title: string;
	page: string | any;
}

export interface BreadcrumbTitle {
	title: string;
}

@Injectable()
export class SubheaderService {
	// Public properties
	title$: BehaviorSubject<BreadcrumbTitle> = new BehaviorSubject<BreadcrumbTitle>({ title: ''});

	constructor() {
		
	}
	/**
	 * Set title
	 *
	 * @param title: string
	 */
	setTitle(title: string) {
		this.title$.next({ title });
	}

}
