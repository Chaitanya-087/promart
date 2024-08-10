import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Role, User } from "../_models";
import { faDisplay, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Cart } from "../_models/cart";
import { CART } from "../mock/cart";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
  animations: [
    trigger("slideOpen", [
      state("closed", style({ transform: "translateX(100%)", opacity: 0 })),
      state("open", style({ transform: "translateX(0)", opacity: 1 })),
      transition("closed <=> open", [animate("0.2s ease-in-out")]),
    ]),
  ],
})
export class NavbarComponent {
  faShoppingCart = faShoppingCart;
  roles = Role;
  cart: Cart = CART;
  cartCount: Number = this.cart.items.length;
  user: User = {
    id: "",
    username: "Anonymous",
    email: "",
    role: Role.VIEWER,
  };
  state: string = "closed";
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.getUser();
  }
  toggleState(): void {
    this.state = this.state === "closed" ? "open" : "closed";
  }
  getUser(): void {
    this.authService.user.subscribe((user) => (this.user = user));
  }
}
