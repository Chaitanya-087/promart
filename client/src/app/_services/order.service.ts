import { ToastrService } from 'ngx-toastr';
import { OrderForm } from './../_models/orderForm';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { AddressForm } from '../_models/AddressForm';
type AddressFormWithOutId = Omit<AddressForm,'id'>;
@Injectable({
    providedIn: 'root'
  })
export class OrderService {

    constructor(private http: HttpClient,private toastrService: ToastrService) { }

    placeOrder(order: OrderForm,userId: String){
        return this.http.post<Order>(`${environment.apiUrl}/orders`,order,{params:{id:userId.toString()}}).pipe(
            catchError((error) => {
                this.toastrService.error(error.message);
                return EMPTY;
            })
        );
    }

    getAddress(userId: String){
        return this.http.get<AddressFormWithOutId>(`${environment.apiUrl}/address`,{params:{id:userId.toString()}})
    }

    getOrders(userId: String){
        return this.http.get<Order[]>(`${environment.apiUrl}/orders`,{params:{id:userId.toString()}}).pipe(
            catchError((error) => {
                this.toastrService.error(error.message);
                return EMPTY;
            })
        );
    }

    cancelOrder(orderId: number) {
        return this.http.put<Order>(`${environment.apiUrl}/orders/cancel`,{}, {params:{id:orderId.toString()}}).pipe(
            catchError((error) => {
                this.toastrService.error(error.message);
                return EMPTY;
            })
        );
    }

    deleteOrder(orderId: number) {
        return this.http.delete<Order>(`${environment.apiUrl}/orders`,{params:{id:orderId}}).pipe(
            catchError((error) => {
                this.toastrService.error(error.message);
                return EMPTY;
            })
        );
    }
}