import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuard } from './_helpers';
import { BaseTemplateComponent } from './base-template/base-template.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RoleGuard } from './_helpers/role.guard';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:"", redirectTo: "promart/home", pathMatch: "full"},
  {
    path: "promart",
    children:[
      {path: "home", component: HomeComponent},
      {path: "admin",component: AdminHomeComponent, canActivate: [RoleGuard]},
      {path: "orders",component: OrdersComponent},
    ],
    component: BaseTemplateComponent,
    canActivate: [RouteGuard],
  },
  {
    path: "auth",
    children: [
      {path: "login", component: LoginComponent},
      {path: "signup", component: SignupComponent},
    ],
    component: AuthTemplateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
