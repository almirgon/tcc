import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Promotion } from '../models/Promotion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private myApi: string;
  private httpOptions: object;

  constructor(private http: HttpClient) { 
    this.myApi = 'https://promotionapi.herokuapp.com/api';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public deletePromotion(id: number):Observable<HttpResponse<any>>{
    const url = this.myApi + '/promotion/' + id;
    return this.http.delete(url, { observe: 'response' });
  }

  public setStatus(id: number){
    const url = this.myApi + '/promotion/status/' + id;
    this.http.post(url, id);
  }

  public updatePromotion(id: number, promotion: Promotion){
    const url = this.myApi + '/promotion/' + id;
    this.http.put(url, promotion);
  }

  public getClosersPromotions(){
    const url = this.myApi + '/promotion/closers';
    this.http.get(url);
  }

  public getPendingsPromotions(){
    const url = this.myApi + '/promotion/pendings';
    return this.http.get<any>(url, this.httpOptions);
  }

  public approvePromotion(id: number){
    const url = this.myApi + '/promotion/active' + id;
    this.http.post(url, id);
  }

  public sendPhoto(id: number, photo: File){
    const url = this.myApi + '/promotion/uploadPhoto';
    this.http.post(url, {id, photo});
  }
}