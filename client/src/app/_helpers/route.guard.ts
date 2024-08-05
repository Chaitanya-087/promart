import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): Boolean | Observable<Boolean | UrlTree> {
    this.auth.isValid.subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
    return this.auth.isValid;
  }
}
