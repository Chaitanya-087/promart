import { HttpClient } from "@angular/common/http";
import { Injectable, Renderer2 } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from "rxjs";
import { CartItem } from "../_models/cartItem";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { Role } from "../_models";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private hidden$: boolean = true;
  private cartItemCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  private cartItems$: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {
    if (this.authService.role === Role.USER) {
      this.loadCartItems();
    }
  }

  get hidden(): boolean {
    return this.hidden$;
  }

  open(): void {
    this.hidden$ = false;
  }

  close(): void {
    this.hidden$ = true;
  }

  private loadCartItems(): void {
    this.http
      .get<CartItem[]>(`${environment.apiUrl}/cart`, {
        params: { id: this.authService.uid },
      })
      .pipe(catchError((error) => {
        this.toastrService.error(error.message);
        return EMPTY;
      }))
      .subscribe((items) => {
        this.cartItems$.next(items.sort((a, b) => a.id - b.id));
        this.cartItemCount$.next(items.length);
      });
  }

  get cartItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }

  get cartItemCount(): Observable<number> {
    return this.cartItemCount$.asObservable();
  }

  clearCart(): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}/cart/clear`, {
        params: { id: this.authService.uid.toString() },
      })
      .pipe(
        tap((_) => {
          this.cartItems$.next([]);
          this.cartItemCount$.next(0);
        }),
        catchError((_) => {
          this.toastrService.error("Error in clearing cart");
          return EMPTY;
        })
      );
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/cart`, {
        userId: this.authService.uid,
        productId,
        quantity,
      })
      .pipe(
        tap((_) => {
          this.loadCartItems();
        }),
        catchError((_) => {
          this.toastrService.error("Error in adding item to cart");
          return EMPTY;
        })
      );
  }

  updateCartItem(
    cartItemId: number,
    productId: number,
    quantity: number
  ): Observable<any> {
    return this.http
      .put<any>(
        `${environment.apiUrl}/cart`,
        { userId: this.authService.uid, productId, quantity },
        { params: { id: cartItemId } }
      )
      .pipe(
        tap((_) => {
          this.loadCartItems();
        }),
        catchError((_) => {
          this.toastrService.error("Error in updating cart item");
          return EMPTY;
        })
      );
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiUrl}/cart`, { params: { id: cartItemId } })
      .pipe(
        tap((_) => {
          this.removeCartItemFromState(cartItemId);
        }),
        catchError((_) => {
          this.toastrService.error("Error in deleting cart item");
          return EMPTY;
        })
      );
  }
  private removeCartItemFromState(cartItemId: number): void {
    const items = this.cartItems$.value.filter((i) => i.id !== cartItemId);
    this.cartItems$.next(items);
    this.cartItemCount$.next(items.length);
  }
}
