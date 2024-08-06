import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { LoginForm } from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: LoginForm={
    username: "",
    password: "",
  };
  constructor(private authService: AuthService,private location: Location) { }

  login() {
    this.authService.login(this.form).subscribe();
    this.form.username='';
    this.form.password='';
  }

  back() {
    this.location.back();
  }
}
