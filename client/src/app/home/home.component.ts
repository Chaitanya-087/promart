import { AuthService } from './../_services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username:string = "Anonymous";

  constructor(public authService:AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.username = user.username;
    })
  }

}
