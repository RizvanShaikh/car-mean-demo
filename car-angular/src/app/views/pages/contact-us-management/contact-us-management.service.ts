import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../../services/localstorage.service';
import { environment } from '../../../../environments/environment';
import { ApiURIs } from '../../../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class ContactUsManagementService {

  constructor(private http: HttpClient, public localStorageService: LocalstorageService) {

   }

   getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }

  getContactUsById(id) {
    return this.http.get(ApiURIs.getContactUsById + '/' + id, { headers: this.getHeader() });
  }

  getContactUsList() {
    return this.http.get(ApiURIs.listContacts, { headers: this.getHeader() });
  }

}
