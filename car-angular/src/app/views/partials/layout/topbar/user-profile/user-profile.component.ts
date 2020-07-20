// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

import { LocalstorageService } from '../../../../../services/localstorage.service';
@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	// user$: Observable<User>;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	placeHolderImg = './assets/media/flags/userPlaceHolder.png';
	userFullName = '';
	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private router: Router, public localStorageService: LocalstorageService, ) {
	}

	/**
	 * On init
	 */
	ngOnInit(): void {

		let user = this.localStorageService.getCurruntUser();
		if (user && user != null) {
			this.placeHolderImg = user.user_profileImage && user.user_profileImage != null && user.user_profileImage != '' ? user.user_profileImage : this.placeHolderImg;

			this.userFullName = user.user_firstName && user.user_firstName != null && user.user_firstName != '' ? user.user_firstName : '' + user.user_lastName && user.user_lastName != null && user.user_lastName != '' ? user.user_lastName : '';
		}

	}

	/**
	 * Log out
	 */
	logout() {
		this.localStorageService.removeToken();
		this.localStorageService.removeCurruntUser();
		this.router.navigate(['/admin/login']);
	}
}
