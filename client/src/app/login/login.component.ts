import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../services/authservice.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private location: Location,
    private authService: AuthserviceService,
    private router: Router) { }
  message
  login(form) {
    const login = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.authService.login(login).subscribe(data => {
      if (!data.success) {
        this.message = data.message;
      } else {
        this.authService.storeUserData(data.token,data.user)
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/index'])
        }, 2000)
      }

    })
  }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)])
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }


}
