import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent}from './register/register.component'
import { from } from 'rxjs';
import { NewpostComponent } from "./newpost/newpost.component"
const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  
  {
    path:"register",
    component:RegisterComponent
  },
    
  {
    path:"newpost",
    component:NewpostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
