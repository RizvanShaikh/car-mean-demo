import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../../services/localstorage.service';
import { environment } from '../../../../environments/environment';
import { ApiURIs } from '../../../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class CmsManagementService {
  constructor(private http: HttpClient, public localStorageService: LocalstorageService) {
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }

  addCMS(data) {
    return this.http.post(ApiURIs.addCMS, data, { headers: this.getHeader() });
  }

  getCMSById(id) {
    return this.http.get(ApiURIs.getCMSById + '/' + id, { headers: this.getHeader() });
  }

  updateCMS(id, data) {
    return this.http.put(ApiURIs.updateCMS + '/' + id, data, { headers: this.getHeader() });
  }

  deleteCMSById(id) {
    return this.http.delete(ApiURIs.deleteCMSById + '/' + id, { headers: this.getHeader() });
  }

  updateStatus(id, data) {
    return this.http.put(ApiURIs.updateCMSStatus + '/' + id, data, { headers: this.getHeader() });
  }


}
