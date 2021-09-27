import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Promotion } from '../models/Promotion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private myApi: string;
  private httpOptions: object;

  constructor(private http: HttpClient) { 
    this.myApi = 'https://promotionapi.herokuapp.com/api';
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public createPromotion(promotion: Promotion): Observable<HttpResponse<any>>{
    const url = this.myApi + '/promotion';
    return this.http.post<any>(url, promotion, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response'});
  }

  public getPromotionById(id: number): Observable<any> {
    const url = this.myApi + '/promotion/' + id;
    return this.http.get<Promotion>(url);
  }

  public putPromotion(id: number, promotion: Promotion): Observable<HttpResponse<any>>{
    const url = this.myApi + '/promotion/' + id;
    return this.http.put<any>(url, promotion, this.httpOptions);
  }

  public deletePromotion(id: number): Observable<HttpResponse<any>>{
    const url = this.myApi + '/promotion/' + id;
    return this.http.delete<any>(url, this.httpOptions);
  }

  public like(id: number): Observable<any>{
    const url = this.myApi + '/promotion/like/' + id;
    return this.http.post<any>(url,this.httpOptions);
  }

  public getActivesPromotions(): Observable<any[]>{
    const url = this.myApi + '/promotion/actives'
    return this.http.get<any[]>(url);
  }

  public getClosersPromotions(): Observable<any>{
    const url = this.myApi + '/promotion/closers'
    return this.http.get(url)
  }
}