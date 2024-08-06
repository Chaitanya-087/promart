import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LoginForm } from '../_models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form: LoginForm = {
    username: '',
    password: ''
  };
  constructor(private authService: AuthService,private location: Location){}

  register() {
    this.authService.register(this.form).subscribe();
    this.form.username='';
    this.form.password='';
  }
  back() {
    this.location.back();
  }
}
