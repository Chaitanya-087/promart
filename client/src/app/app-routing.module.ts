import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthTemplateComponent } from './auth-template/auth-template.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {
    path: "home",
    children:[],
    component: HomeComponent,
  },
  {
    path: "",
    children: [
      {path: "login", component: LoginComponent},
      {path: "signup", component: SignupComponent},
    ],
    component: AuthTemplateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
