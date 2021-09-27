import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myApi: string;

  constructor(private http: HttpClient) { 
    this.myApi = 'https://promotionapi.herokuapp.com/api';
  }

  public createUser(user: User): Observable<HttpResponse<User>>{
    const url = this.myApi + '/users';
    return this.http.post<User>(url, user, { observe: 'response' });
  }

  public getUserByEmail(email: String) {
    const url = this.myApi + '/users/' + email;
    return this.http.get<User>(url);
  }

  public getUserById(id: number) {
    const url = this.myApi + '/users/' + id;
    return this.http.get<User>(url);
  }
}

