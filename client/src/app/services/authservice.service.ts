import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { tokenNotExpired } from 'angular2-jwt';
// import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  domain = "http://localhost:8085/";
  constructor(private http: HttpClient,
    // public jwtHelper: JwtHelperService
    ) { }
  options

  createAuthenticationHeaders() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    }

  }
  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
    console.log(this.authToken)
  }
  onRegisterSubmit_data(config) {
    return this.http.post(this.domain + 'authentication/register', config).pipe(map((res: any) => {
      return res;
    }))
  }

  login(user) {
    return this.http.post(this.domain + 'authentication/login', user).pipe(map((res: any) => {
      return res;
    }))
  }


  getAllBlogs() {
    return this.http.get(this.domain + "authentication/allBlogs").pipe(map((res: any) => {
      return res;
    }))
  }

  authToken
  user
  storeUserData(token, user) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user
    console.log(this.user)
  }


  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }


  
  newBlog(blog){
    // this.createAuthenticationHeaders();
    return this.http.post(this.domain +'authentication/newBlog',blog).pipe(map((res: any) => {
      return res;
    }))
  }

}
