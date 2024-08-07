import { catchError, of, tap, throwError } from 'rxjs';
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { AuthService } from "../_services/auth.service";
import { LoginForm } from "../_models";
import { faArrowLeft,faExclamationTriangle,faXmark } from "@fortawesome/free-solid-svg-icons";
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  faArrowLeft = faArrowLeft;
  faExclamationTriangle = faExclamationTriangle;
  faXmark = faXmark;
  isLoading: boolean = false;
  errorMessage: string = "";
  constructor(
    private authService: AuthService,
    private location: Location,
    private ngxService: NgxUiLoaderService
  ) {}

  private showLoader(): void {
    this.isLoading = true;
    this.ngxService.start();
  }

  private hideLoader(): void {
    this.isLoading = false;
    this.ngxService.stop();
  }

  login(form: LoginForm) {
    if (!form.username || !form.password) {
      this.errorMessage = "Username and password are required";
      return;
    }
    this.showLoader();
    this.authService.login(form).pipe(catchError((e) =>{
      this.errorMessage = e.error.message;
      this.hideLoader();
      return of(null);
    })).subscribe((_) => {
      this.hideLoader();
      form.username = "";
      form.password = "";
    });
  }

  back() {
    this.location.back();
  }

  removeError() {
    this.errorMessage = "";
  }
}
