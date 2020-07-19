import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from '../../../services/localstorage.service';
import { environment } from '../../../../environments/environment';
import { ApiURIs } from '../../../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http: HttpClient, public localStorageService: LocalstorageService) { }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }
  getHeaderFile() {
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    const token = this.localStorageService.getToken();
    headers = headers.set('Authorization', token);
    return headers;
  }

  addBuyer(data) {
    return this.http.post(ApiURIs.addUser + '/EN', data, { headers: this.getHeader() });
  }

  getBuyerById(id) {
    return this.http.get(ApiURIs.getUserById + '/BUYER/' + id, { headers: this.getHeader() });
  }

  updateBuyer(id, data) {
    return this.http.put(ApiURIs.updateUser + '/BUYER/' + id, data, { headers: this.getHeader() });
  }

  deleteBuyerById(id) {
    return this.http.delete(ApiURIs.deleteUserById + '/BUYER/' + id, { headers: this.getHeader() });
  }

  updateStatus(id, data) {
    return this.http.put(ApiURIs.updateUserStatus + '/' + id, data, { headers: this.getHeader() });
  }

}
