import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})//mg
export class RouteGuard {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): Boolean | Observable<Boolean | UrlTree> {
    this.auth.isLoggedIn.subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
    return this.auth.isLoggedIn;
  }
}
