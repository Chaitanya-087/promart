import { Role, User } from '../_models';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = {
    id: "",
    username: "Anonymous",
    email: "",
    role: Role.VIEWER
  };
  
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
