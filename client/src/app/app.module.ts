import { productReducer } from './store/product/product.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NavbarComponent } from "./navbar/navbar.component";
import { HasRoleDirective } from './_helpers';
import { BaseTemplateComponent } from './base-template/base-template.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CartComponent } from "./cart/cart.component";
import { PopupComponent } from './popup/popup.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from './store/product/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthTemplateComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    BaseTemplateComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgxUiLoaderModule,
    HasRoleDirective,
    BrowserAnimationsModule,
    PopupComponent,
    StoreModule.forRoot({product: productReducer}),
    EffectsModule.forRoot([ProductEffect]),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar:true
    }),
],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true
      
    }),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
