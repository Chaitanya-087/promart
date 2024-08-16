import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): Boolean | Observable<Boolean | UrlTree> {
    if (this.auth.role !== Role.ADMIN) {
        this.router.navigate(["/home"]);
        return false;
    }
    return true;
  }
}