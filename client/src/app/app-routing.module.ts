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

const routes: Routes = [
  {path:"", redirectTo: "home", pathMatch: "full"},
  {
    path: "",
    children:[
      {path: "home", component: HomeComponent},
      {path: "admin",component: AdminHomeComponent, canActivate: [RoleGuard]}
    ],
    component: BaseTemplateComponent,
    canActivate: [RouteGuard],
  },
  {
    path: "",
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
