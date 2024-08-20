import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Role, User } from "../_models";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../_services/cart.service";
import { Router } from "@angular/router";

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
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.setAuthStatus();
    this.getCartCount();
  }

  open(): void {
    this.cartService.open();
  }

  getCartCount(): void {
    this.cartService.cartItemCount.subscribe(
      (count) => (this.cartCount = count)
    );
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
