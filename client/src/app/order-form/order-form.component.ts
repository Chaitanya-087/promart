import { AuthService } from './../_services/auth.service';
import { OrderForm } from './../_models/orderForm';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../_models/cartItem';
import { OrderService } from '../_services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  @Output() close = new EventEmitter<void>();

  form: OrderForm = {
    cartItemIds: [],
    paymentMethod: "",
    address: {
      fullAddress: '',
      city: '',
      state: '',
      pincode: '',
      phoneNumber: ''
    }
  };
  paymentMethods=["UPI","Net Banking"]
  @Input() selectedItems: CartItem[] = []

  constructor(private orderService: OrderService,private authService: AuthService,private router: Router,private cartService: CartService) {
    this.getAddress();
  }

  getAddress() {
    this.orderService.getAddress(this.authService.uid).subscribe(
      address => {
        this.form.address = address;
      });
  }

  placeOrder() {
    this.form.cartItemIds = this.selectedItems.map(i => i.id);
    this.orderService.placeOrder(this.form,this.authService.uid).subscribe(
      _ => {
        this.close.emit();
        this.router.navigate(["/promart/orders"]);
      }
    );
  }

  get orderAmount():number {
    return this.selectedItems.reduce((acc,curr) => curr.price*curr.quantity + acc,0)
  }


}
