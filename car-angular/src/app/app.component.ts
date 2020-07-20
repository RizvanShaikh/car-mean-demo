import { Subscription } from "rxjs";
// Angular
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { APPNAME } from "../app/helper/page.title";
// Layout
import {
  LayoutConfigService,
  SplashScreenService,
  TranslationService,
} from "./core/_base/layout";
// import { RolesService } from "./views/pages/roles/roles.service";
import { LocalstorageService } from "./services/localstorage.service";
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: "body[kt-root]",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  // Public properties
  title = APPNAME;
  loader: boolean;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  /**
   * Component constructor
   *
   * @param translationService: TranslationService
   * @param router: Router
   * @param layoutConfigService: LayoutCongifService
   * @param splashScreenService: SplashScreenService
   */
  constructor(
    private translationService: TranslationService,
    private router: Router,
    private translateService: TranslateService,
    private layoutConfigService: LayoutConfigService,
    private splashScreenService: SplashScreenService,
    // private roleService: RolesService,
    public localstorageService: LocalstorageService,
    
  ) {
    this.translateService.addLangs(["ar", "en"]);
    this.translateService.setDefaultLang("en");
    // this.setSessionPermissionArray();
  
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.loader = this.layoutConfigService.getConfig("loader.enabled");

    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // hide splash screen
        this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add("kt-page--loaded");
        }, 500);
      }
    });
	this.unsubscribe.push(routerSubscription);
	
  }

  // setSessionPermissionArray() {
  //   let user = this.localstorageService.getCurruntUser();
	// 	if (user && user.user_roleId != "") {
	// 	  this.roleService.getRoleWisePermissions(user.user_roleId).subscribe((data)=>{
	// 		  if(data['code']){
  //         this.localstorageService.setBehaviorView(data['data']['permissions']);
	// 		  }
	// 	  })
  //   }
  // }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
