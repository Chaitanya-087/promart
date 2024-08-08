import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Role, User } from "../_models";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  faShoppingCart = faShoppingCart;
  roles = Role;
  cartCount: Number = 0;
  user: User = {
    id: "",
    username: "Anonymous",
    email: "",
    role: Role.VIEWER,
  };
  constructor(public authService: AuthService) {}
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authService.user.subscribe((user) => (this.user = user));
  }
}
