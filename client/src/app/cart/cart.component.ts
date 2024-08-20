import { CartItem } from "./../_models/cartItem";
import { CartService } from "./../_services/cart.service";
import {
  animate,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, ViewChild } from "@angular/core";
import { faXmark,faPlus,faMinus,faTrash } from "@fortawesome/free-solid-svg-icons";
import { PopupComponent } from "../popup/popup.component";

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
        animate("60ms ease-in", style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class CartComponent {
  faXmark = faXmark;
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  cartItems: CartItem[] = [];
  @ViewChild('orderForm') orderForm!: PopupComponent;
  selectedCartItems: CartItem[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems.subscribe((items) => {
      this.cartItems = items;
    });
  }
  isCheckoutButtonVisible(): boolean {
    return this.selectedCartItems.length > 0 && this.cartItems.length > 0; 
  }
  removeFromCart(id: number): void {
    this.cartService.deleteCartItem(id).subscribe(
      _ => {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.selectedCartItems = this.selectedCartItems.filter(item => item.id !== id);
      }
    );
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe();
  }

  toggleCartItem(cartItem: CartItem): void {
    if (this.isSelected(cartItem.id)) {
      this.selectedCartItems = this.selectedCartItems.filter(
        (item) => item.id !== cartItem.id
      );
    } else {
      this.selectedCartItems.push(cartItem);
    }
  }

  toggleAll(): void {
    if (this.selectedCartItems.length === this.cartItems.length) {
      this.selectedCartItems = [];
    } else {
      this.selectedCartItems = [...this.cartItems];
    }
  }

  isSelected(id: number): boolean {
    return this.selectedCartItems.find((item) => item.id === id) ? true : false;
  }

  checkout(): void {
    this.cartService.close();
    this.orderForm.showPopup();
  }

  close(): void {
    this.cartService.close();
    this.selectedCartItems = [];
  }

  get totalPrice(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  get selectedItemsPrice(): number {
    const selectedItems = this.cartItems.filter((item) => this.isSelected(item.id));
    return selectedItems.reduce((acc,item) => acc + item.price * item.quantity,0);
  }

  decreaseQuantity(id: number): void {
    this.cartItems.forEach(item => {
      if (item.id === id) {
        item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
        this.cartService.updateCartItem(item.id,item.productId,item.quantity).subscribe();
      }
    })
  }

  increaseQuantity(id: number): void {
    this.cartItems.forEach(item => {
      if (item.id === id) {
        item.quantity++;
        this.cartService.updateCartItem(item.id,item.productId,item.quantity).subscribe();
      }
    })
  }
}
