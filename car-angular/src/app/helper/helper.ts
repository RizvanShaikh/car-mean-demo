import { SplashScreenService } from '../core/_base/layout/services/splash-screen.service';

declare const $: any;

export class Helpers {
	constructor(public splashScreenService: SplashScreenService) {


	}

	static loadStyles(tag, src) {
		if (Array.isArray(src)) {
			$.each(src, function (k, s) {
				$(tag).append($('<link/>').attr('href', s).attr('rel', 'stylesheet').attr('type', 'text/css'));
			});
		} else {
			$(tag).append($('<link/>').attr('href', src).attr('rel', 'stylesheet').attr('type', 'text/css'));
		}
	}

	static setLoading(enable) {
		let body = $('body');
		if (enable) {
			$(body).addClass('kt-page--loading-non-block')
		} else {
			$(body).removeClass('kt-page--loading-non-block')
		}

	}

}