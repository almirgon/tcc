import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler, ): Observable<HttpEvent<any>> {
    const dupReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
    });
    return next.handle(dupReq);
  }
}
