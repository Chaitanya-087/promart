import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, combineLatest, map, Observable, of, tap } from "rxjs";
import { User,LoginForm} from "../_models";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private PUBLIC_USER: User = {
    id: "",
    username: "Anonymous",
    token: "",
    role: "Viewer",
  };
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.PUBLIC_USER);
  constructor(private http: HttpClient,private cookieService:CookieService,private router: Router) {
    this.isLoggedIn$.next(this.cookieService.check("promart.user"));
    this.fetchUser();
  }

  login(form: LoginForm): Observable<User> {  
    return this.http.post<User>(`${environment.authUrl}/login`, form).pipe(
      tap((res) => {
        this.isLoggedIn$.next(true);
        this.user$.next(res);
        this.cookieService.set("promart.user", JSON.stringify(res));
        // this.router.events.subscribe((params) => {
          
        // });
        this.router.navigate(["/home"]);
      })
    );
  }

  private fetchUser(): void {
    if (this.isLoggedIn$.value) {
      const user = JSON.parse(this.cookieService.get("promart.user")) as User;
      this.user$.next(user);
    } else {
      this.user$.next(this.PUBLIC_USER);
    }
  }

  logout(): void {
    if (!this.isLoggedIn$.value) {
      return;
    }
    this.http.post(`${environment.authUrl}/logout`, {},{headers: {
      Authorization: `Bearer ${this.user$.value.token}`,
    }}).subscribe(() => {
      this.isLoggedIn$.next(false);
      this.user$.next(this.PUBLIC_USER);
      this.cookieService.deleteAll();
      this.router.navigate(["/login"]);
    });
  }

  get isLoggedIn(): Observable<Boolean> {
    return combineLatest([this.isLoggedIn$.asObservable(), this.isTokenValid()]).pipe(
      map(([isLoggedIn, isTokenValid]) => {
        return isLoggedIn && isTokenValid;
      })
    );
  }

  private isTokenValid(): Observable<boolean> {
    if (!this.cookieService.check("token")) {
      return of(false);
    }
    return this.user$.pipe(
      map((user) => {
        const payload = user.token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload) as string);
        return decodedPayload.exp > Date.now() / 1000;
      })
    )
  }

  get user(): Observable<User> {
    return this.user$.asObservable();
  }

}
