import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { from } from 'rxjs';
import { NewpostComponent } from "./newpost/newpost.component";
import { EditblogComponent } from "./editblog/editblog.component";
import { DeleteblogComponent } from "./deleteblog/deleteblog.component";
import { IndexComponent } from "./index/index.component";
import {BlogdetailsComponent} from "./blogdetails/blogdetails.component"
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "register",
    component: RegisterComponent
  },

  {
    path: "newpost",
    component: NewpostComponent
  },
  {
    path: "edit-blog/:id",
    component: EditblogComponent
  },
  {
    path: "delete-blog/:id",
    component: DeleteblogComponent
  },
  {
    path: "index",
    component: IndexComponent
  },
  {
    path: "detail-blog/:id",
    component: BlogdetailsComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
