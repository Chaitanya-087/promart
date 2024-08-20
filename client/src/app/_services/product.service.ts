import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, Product, ProductForm } from "../_models";
import { environment } from "src/environments/environment";
import { catchError, EMPTY, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  get categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  //user
  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products/available`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiUrl}/products`, product, {
      params: { id: product.id.toString() },
    });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/products`, {
        params: { id: productId.toString() },
      })
      .pipe(
        catchError((_) => {
          this.toastrService.error("Error in deleting product reference in order or cartitem");
          return EMPTY;
        })
      );
  }

  addProduct(product: ProductForm): Observable<Product> {
    return this.http
      .post<Product>(`${environment.apiUrl}/products`, product)
      .pipe(
        catchError((error) => {
          this.toastrService.error(error.message);
          return EMPTY;
        })
      );
  }
  //admin
  get products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      catchError((error) => {
        this.toastrService.error(error.message);
        return EMPTY;
      })
    );
  }
}
