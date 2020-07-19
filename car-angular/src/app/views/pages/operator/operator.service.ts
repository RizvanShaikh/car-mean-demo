import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../../services/localstorage.service';
import { environment } from '../../../../environments/environment';
import { ApiURIs } from '../../../../api-constants';


@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor(private http: HttpClient, public localStorageService: LocalstorageService) { }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }

  // addOperator(data) {
  //   return this.http.post(ApiURIs.addOperator, data, { headers: this.getHeader() });
  // }

  // getOperatorById(id) {
  //   return this.http.get(ApiURIs.getOperatorById + '/' + id, { headers: this.getHeader() });
  // }

  // updateOperator(id, data) {
  //   return this.http.put(ApiURIs.updateOperator + '/' + id, data, { headers: this.getHeader() });
  // }

  // deleteOperatorById(id) {
  //   return this.http.delete(ApiURIs.deleteOperatorById + '/' + id, { headers: this.getHeader() });
  // }

  // updateStatus(id, data) {
  //   return this.http.put(ApiURIs.updateOperatorStatus + '/' + id, data, { headers: this.getHeader() });
  // }

  // getAllCountries(){
  //   return this.http.get(ApiURIs.getCountriesArray + '/EN',  { headers: this.getHeader() });
  // }
}
