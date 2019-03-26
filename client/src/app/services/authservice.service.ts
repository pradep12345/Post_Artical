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
  ) { }
  options
  authToken
  user
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

  storeUserData(token, user) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
  newBlog(blog) {
    return this.http.post(this.domain + 'authentication/newBlog', blog).pipe(map((res: any) => {
      return res;
    }))
  }
  getSingleBlog(id) {
    return this.http.get(this.domain + 'authentication/singleBlog/' + id, this.options).pipe(map((res: any) => {
      return res;
    }))
  }

  editBlog(blog) {
    return this.http.put(this.domain + 'authentication/updateBlog', blog, this.options).pipe(map((res: any) => {
      return res;
    }))
  }
  deleteBlog(id) {
    return this.http.delete(this.domain + 'authentication/deleteBlog/' + id, this.options).pipe(map((res: any) => {
      return res;
    }))
  }
  comment(blog) {
    return this.http.put(this.domain + 'authentication/comment', blog, this.options).pipe(map((res: any) => {
      return res;
    }))
  }
  
}
