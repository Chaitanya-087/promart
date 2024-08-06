import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { LoginForm } from '../_models';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  faArrowLeft = faArrowLeft
  isLoading:boolean = false;
  form: LoginForm={
    username: "",
    password: "",
  };
  constructor(private authService: AuthService,private location: Location, private ngxService: NgxUiLoaderService) { }
  showLoader(): void {
    this.isLoading = true;
    this.ngxService.start();
  }

  hideLoader(): void {
    this.isLoading = false;
    this.ngxService.stop();
  }
  login() {
    this.showLoader()
    this.authService.login(this.form).subscribe(
      (_) => {
        this.hideLoader()
      }
    );
    this.form.username='';
    this.form.password='';
  }

  back() {
    this.location.back();
  }
}
