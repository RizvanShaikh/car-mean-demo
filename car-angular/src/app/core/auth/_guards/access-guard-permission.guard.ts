import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../../../services/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class AccessGuardPermissionGuard implements CanActivate {
  
  checkHasPermission : boolean = false;
  constructor(private auth: AuthService,
    private router: Router,
    public localstorageService: LocalstorageService,
    private toastr: ToastrService) { 

    }
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.getPermission(next);
      if(!this.checkHasPermission){
        this.toastr.warning('YOU DO NOT HAVE PERMISSION....!!!');
        this.router.navigate(['/admin/dashboard'])
        return this.checkHasPermission;
      }else{
        return this.checkHasPermission;
      }
      
  }
 
  async getPermission(next){
		await this.localstorageService.getBehaviorView().subscribe((data:any)=>{
			if(data && data.length){
				if(this.checkRoleHasPermission(data, next['data'].permission ) && this.checkRoleHasPermission(data, next['data'].mainModulePermission ) ){
					this.checkHasPermission = true;
        }
      }
	   });
	}
	checkRoleHasPermission(data,permissionName){
		return  data.find(function (element) {
			return element == permissionName; 
		}); 
	} 

}
