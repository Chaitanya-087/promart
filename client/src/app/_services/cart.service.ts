import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { CartItem } from '../_models/cartItem';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItemCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  private hidden$: boolean = true;

  constructor(private http: HttpClient,private authService: AuthService) { }

  get hidden(): boolean {
    return this.hidden$
  }
  
  toggle(): void {
    this.hidden$ = !this.hidden$;
  }

  get cartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${environment.apiUrl}/cart`,{params:{id:this.authService.uid}}).pipe(
      tap(res => this.cartItemCount$.next(res.length)),
      catchError(_ => [])
    )
  }

  get cartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount$;
  }

  addToCart(productId: number,quantity: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/cart`,{userId:this.authService.uid,productId,quantity})
  }

  updateCartItem(cartItemId: number,productId: number,quantity: number): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/cart`,{userId:this.authService.uid,productId,quantity},{params:{id:cartItemId}})
  }

  deleteCartItem(cartItemId: number) : Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/cart`,{params:{id:cartItemId}})
  }
}
