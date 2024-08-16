import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { ProductService } from "src/app/_services/product.service";
import { loadProducts, loadProductsSuccess } from "./product.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductEffect{
    loadData$ = createEffect(() =>
        this.actions$.pipe(
          ofType(loadProducts),
          switchMap(() =>
            this.productService.getAvailableProducts().pipe(
              map(data => loadProductsSuccess({ products: data })),
              catchError(error => of(loadProductsSuccess({ products: [] })))
            )
          )
        )
      );
    constructor(private actions$: Actions, private productService: ProductService) {}
}