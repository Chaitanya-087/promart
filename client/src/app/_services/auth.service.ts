import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, combineLatest, map, Observable, tap } from "rxjs";
import { User,LoginForm } from "../_models";
import { Router } from "@angular/router";
import { Role } from "../_models/Role";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  private PUBLIC_USER: User = {
    id: "",
    username: "Anonymous",
    token: "",
    role: Role.VIEWER,
  };
  private user$: BehaviorSubject<User> = new BehaviorSubject<User>(this.PUBLIC_USER);

  constructor(private http: HttpClient,private router: Router) {
    this.isLoggedIn$.next(!!localStorage.getItem("user"));
    this.fetchUser();
  }

  //login save the session in local storage
  login(form: LoginForm): Observable<User> {  
    return this.http.post<User>(`${environment.authUrl}/login`, form).pipe(
      tap((res) => {
        this.saveSession(res);
      })
    );
  }

  //register save the session in local storage
  register(form: LoginForm): Observable<User> {
    return this.http.post<User>(`${environment.authUrl}/register`, form).pipe(
      tap((res) => {
        this.saveSession(res);
      })
    );
  }

  private saveSession(res: User) {
    this.isLoggedIn$.next(true);
    this.user$.next(res);
    localStorage.setItem("user", JSON.stringify(res));
    this.router.navigate(["/home"]);
  }

  private mapRole(role: string): Role {
    switch(role) {
      case "ADMIN":
        return Role.ADMIN;
      case "USER":
        return Role.USER;
      default:
        return Role.VIEWER;
    }
  }

  private fetchUser(): void {
    if (this.isLoggedIn$.value) {
      const token = localStorage.getItem('token');
      const payload = token?.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload as string));
      const user: User = {
        id: decodedPayload.id,
        username: decodedPayload.sub,
        token: token as string,
        role: this.mapRole(decodedPayload.role)
      }
      this.user$.next(user);
    } else {
      this.user$.next(this.PUBLIC_USER);
    }
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    this.user$.next(this.PUBLIC_USER);
    localStorage.removeItem("user");
    // this.router.navigate(["/login"]); 
  }


  //checks if the user is logged in and the token is valid (expiration check)
  get isValid(): Observable<Boolean> {
    return combineLatest([this.isLoggedIn$.asObservable(), this.isTokenValid()]).pipe(
      map(([isLoggedIn, isTokenValid]) => {
        return isLoggedIn && isTokenValid;
      })
    );
  }

  //checks token expiration
  private isTokenValid(): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        if (!user || !user.token) return false;
        const payload = user.token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        const exp = decodedPayload.exp;
        return Date.now() < exp * 1000;
      })
    )
  }

  get user(): Observable<User> {
    return this.user$.asObservable();
  }

  get token(): string {
    return this.user$.value.token;
  }
}
