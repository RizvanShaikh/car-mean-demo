import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  public remberMeKey = 'rememberUser';
  public tokenKey = 'auth';
  public currutUserKey = 'admin';
  public currutLanguage = 'currentLanguage';
  private behave = new BehaviorSubject<Object>('');
  constructor() {


   }

  /** Get remeber me (email, password) */
  getRemeberMe() {
    return JSON.parse(localStorage.getItem(this.remberMeKey)) || null;
  }

  /** Set remeber me (email, password) */
  setRemeberMe(data) {
    localStorage.setItem(this.remberMeKey, JSON.stringify(data));
  }

  /** Remove remeber me (email, password) */
  removeRemeberMe() {
    localStorage.removeItem(this.remberMeKey);
  }

  /** Get user token */
  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey)) || null;
  }

  /** Set user token */
  setToken(data) {
    localStorage.setItem(this.tokenKey,  JSON.stringify(data));
  }

  /** Remoce user token */
  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  /** Get currunt user detail */
  getCurruntUser() {
    return JSON.parse(localStorage.getItem(this.currutUserKey)) || null;
  }

  /** Set currunt user detail */
  setCurruntUser(data) {
    localStorage.setItem(this.currutUserKey,  JSON.stringify(data));
  }

  /** Remove currunt user detail */
  removeCurruntUser() {
    localStorage.removeItem(this.currutUserKey);
  }
  
  setBehaviorView(behave: object) {
      this.behave.next(behave);
  }

/* Get Behavior for user registraion */
    getBehaviorView(): Observable<object> {
        return this.behave.asObservable();
  }

}
