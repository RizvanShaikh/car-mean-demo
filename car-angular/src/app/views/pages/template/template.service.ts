import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../../services/localstorage.service';
import { environment } from '../../../../environments/environment';
import { ApiURIs } from '../../../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  constructor(private http: HttpClient, public localStorageService: LocalstorageService) { }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }

  // addTemplate(data) {
  //   return this.http.post(ApiURIs.addTemplate, data, { headers: this.getHeader() });
  // }

  // getTemplateById(id) {
  //   return this.http.get(ApiURIs.getTemplateById + '/' + id, { headers: this.getHeader() });
  // }

  // updateTemplate(id, data) {
  //   return this.http.put(ApiURIs.updateTemplate + '/' + id, data, { headers: this.getHeader() });
  // }

  // deleteTemplateById(id) {
  //   return this.http.delete(ApiURIs.deleteTemplateById + '/' + id, { headers: this.getHeader() });
  // }

  // updateStatus(id, data) {
  //   return this.http.put(ApiURIs.updateTemplateStatus + '/' + id, data, { headers: this.getHeader() });
  // }

  // getAllCountries(){
  //   return this.http.get(ApiURIs.getCountriesArray + '/EN',  { headers: this.getHeader() });
  // }

}
