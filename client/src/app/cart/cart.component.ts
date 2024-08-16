import { CartItem } from "./../_models/cartItem";
import { CartService } from "./../_services/cart.service";
import {
  animate,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, Input } from "@angular/core";
import { faXmark,faPlus,faMinus,faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
  animations: [
    trigger("slide", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("200ms ease-in", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class CartComponent {
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  selectedCartItems: number[] = [];
  @Input() cartItems: CartItem[] = [];

  constructor(public cartService: CartService) {}

  removeFromCart(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(
      _ => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.cartService.cartItemCount.next(this.cartItems.length);
      }
    );
  }

  selectCartItem(id: number): void {
    if (this.selectedCartItems.includes(id)) {
      this.selectedCartItems = this.selectedCartItems.filter(
        (itemId) => itemId !== id
      );
    } else {
      this.selectedCartItems.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selectedCartItems.includes(id);
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  decreaseQuantity(id: number): void {
    this.cartItems.forEach(item => {
      if (item.id === id) {
        item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
        this.cartService.updateCartItem(item.id,item.productId,item.quantity).subscribe(
          _ => {
            this.cartService.cartItemCount.next(this.cartItems.length);
          }
        );
      }
    })
  }

  increaseQuantity(id: number): void {
    this.cartItems.forEach(item => {
      if (item.id === id) {
        item.quantity++;
        this.cartService.updateCartItem(item.id,item.productId,item.quantity).subscribe(
          _ => {
            this.cartService.cartItemCount.next(this.cartItems.length);
          }
        );
      }
    })
  }
}
