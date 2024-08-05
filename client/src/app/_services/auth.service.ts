import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, map, Observable, tap, catchError, of } from "rxjs";
import { User, LoginForm, AuthResponse, Role } from "../_models";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn$ = new BehaviorSubject<boolean>(this.isTokenValid(this.token));

  constructor(private http: HttpClient, private router: Router) {}

  login(form: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.authUrl}/login`, form).pipe(
      tap((res) => this.saveSession(res)),
      catchError((error) => {
        console.error('Login error', error);
        return of({token: ""});
      })
    );
  }

  register(form: LoginForm): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.authUrl}/register`, form).pipe(
      tap((res) => this.saveSession(res)),
      catchError((error) => {
        console.error('Registration error', error);
        return of({token: ""});
      })
    );
  }

  logout(): void {
    this.isLoggedIn$.next(false);
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.pipe(
      map((isLoggedIn) => isLoggedIn && this.isTokenValid(this.token))
    );
  }

  get user(): Observable<User> {
    const params = new HttpParams().set("id", this.uid);
    return this.http.get<User>(`${environment.authUrl}/me`, { params }).pipe(
      map((user) => ({ ...user, role: this.role })),
      catchError((error) => {
        console.error('Fetch user error', error);
        return of({ id: "", username: "Anonymous", role: Role.VIEWER });
      })
    );
  }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get role(): Role {
    return this.mapRole(this.decodeToken()?.role);
  }

  get uid(): string {
    return this.decodeToken()?.uid || "";
  }

  private saveSession(res: AuthResponse): void {
    if (res && res.token) {
      this.isLoggedIn$.next(true);
      localStorage.setItem("token", res.token);
      this.router.navigate(["/home"]);
    }
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

  private isTokenValid(token: string): boolean {
    const decoded = this.decodeToken(token);
    return !!decoded && decoded.exp * 1000 > Date.now();
  }

  private decodeToken(token: string = this.token): any {
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Token decode error', error);
      return null;
    }
  }
}
