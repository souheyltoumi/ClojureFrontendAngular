import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { compilePipeFromMetadata } from '@angular/compiler';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {path:"home"  ,component:HomePageComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"login",component:LoginPageComponent},
  { path: '**', component: LoginPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }