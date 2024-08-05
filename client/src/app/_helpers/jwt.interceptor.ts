import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const publicUrls = ["/api/v1/auth/login", "/api/v1/auth/register"];
    const isPublicUrl = publicUrls.some((url) => request.url.match(url));
    if (isPublicUrl) {
      return next.handle(request);
    }
    if (!this.authService.isValid) {
      return EMPTY;
    }

    const jwtRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });

    return next.handle(jwtRequest);
  }
}
