import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../Model/user';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('Token')
      })
    };
  }

  createUser(email: string, password: string, confirmPassword: string): Observable<string> {
    const user = new User(email, password, confirmPassword);
    return this.http.post('api/Account/Register', user, this.httpOptions).pipe(
      map(response => {
        const resp = response as any;
        return resp;
      }));
  }

  loginUser(email: string, password: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    const body = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<any>('/api/Token', body.toString(), httpOptions);

  }

  addVictoryPoints() {
    this.http.get('api/Account/AddVictoryPoints', this.getOptions()).subscribe(r => r);
  }
}
