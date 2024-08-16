import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Role, User } from "../_models";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { BehaviorSubject } from "rxjs";
import { CartItem } from "../_models/cartItem";
import { CartService } from "../_services/cart.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  roles = Role;
  faShoppingCart = faShoppingCart;
  isLoggedIn: boolean = false;
  cartCount: Number = 0;
  user: User = {
    id: "",
    username: "Anonymous",
    email: "",
    role: Role.VIEWER,
  };

  constructor(
    private authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.setAuthStatus();
    this.cartService.cartItemCount.subscribe(
      (count) => (this.cartCount = count)
    );
  }

  open(): void {
    this.cartService.toggle();
  }

  setAuthStatus(): void {
    this.authService.isLoggedIn.subscribe(
      (status) => (this.isLoggedIn = status)
    );
  }

  logout(): void {
    this.authService.logout();
  }

  getUser(): void {
    this.authService.user.subscribe((user) => (this.user = user));
  }
}
