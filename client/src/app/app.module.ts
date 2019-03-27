import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import {CustomMaterialModule} from "./material.module"
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthserviceService} from "./services/authservice.service"
import { JwtModule } from '@auth0/angular-jwt';
import { NewpostComponent } from './newpost/newpost.component';
import { EditblogComponent } from './editblog/editblog.component';
import { DeleteblogComponent } from './deleteblog/deleteblog.component';
import { IndexComponent } from './index/index.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import {NgxPaginationModule} from 'ngx-pagination';
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    NewpostComponent,
    EditblogComponent,
    DeleteblogComponent,
    IndexComponent,
    BlogdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        // blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [AuthserviceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
