import { Component } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { SignupForm } from "../_models/SignupFom";
import { NgxUiLoaderService } from "ngx-ui-loader";
import {
  faExclamationTriangle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { catchError, of } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent {
  faExclamationTriangle = faExclamationTriangle;
  faXmark = faXmark;
  isLoading: boolean = false;
  errorMessage: string = "";

  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}

  register(form: SignupForm) {
    this.showLoader();
    this.authService
      .register(form)
      .pipe(
        catchError((e) => {
          this.errorMessage = e.error.message;
          this.hideLoader();
          return of(null);
        })
      )
      .subscribe((_) => {
        this.hideLoader();
        form.username = "";
        form.email = "";
        form.password = "";
      });
  }

  removeError() {
    this.errorMessage = "";
  }

  private showLoader(): void {
    this.isLoading = true;
    this.ngxService.start();
  }

  private hideLoader(): void {
    this.isLoading = false;
    this.ngxService.stop();
  }
}
