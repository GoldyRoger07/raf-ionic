import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../services/url.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private urlService:UrlService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifiez si la requête cible une URL spécifique
    const exceptionUrls = this.urlService.exceptionUrls

    if (exceptionUrls.some(url => !request.url.includes(url))) {
      const token = localStorage.getItem("token") // Récupérer le token
      if (token) {
        console.log("interceptor")
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
