import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {RestUrls} from '../shared/const/URLS';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  public login(credentials) {
    const headers = new Headers();
    headers.append(`Content-Type`, `application/json`);
    headers.append(`X-Requested-With`, `XMLHttpRequest`);
    return this.http.post(RestUrls.login(),
      JSON.stringify(credentials), {headers: headers}).map(response => {
        const result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
    });
  }

  public logout() {
    localStorage.removeItem(`token`);
  }

  public isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    const token = localStorage.getItem(`token`);
    if (!token) {return null};
    return new JwtHelper().decodeToken(token);
  }
}
