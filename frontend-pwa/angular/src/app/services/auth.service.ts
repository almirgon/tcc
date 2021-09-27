import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myApi: string;
  private httpOptions: object;

  constructor(private http: HttpClient, private router: Router) {
    this.myApi = 'https://promotionapi.herokuapp.com/api/login';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
   }

   public login(credentials): Observable<HttpResponse<any>>{
    return this.http.post(this.myApi, credentials, { observe: 'response' });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    return (token && email) ?  true : false;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public saveToken(token: string){
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  public saveRole(role: string){
    localStorage.removeItem('role');
    localStorage.setItem('role', role);
  }

  public getRole(): string {
    return localStorage.getItem('role');
  }

  public saveEmail(email: string){
    localStorage.removeItem('email');
    localStorage.setItem('email', email);
  }

  public getEmail(): string {
    return localStorage.getItem('email');
  }

  public saveName(firstName: string){
    localStorage.removeItem('firstName');
    localStorage.setItem('firstName', firstName);
  }

  public getName(): string {
    return localStorage.getItem('firstName');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.router.navigate(['/home']);
  }
}