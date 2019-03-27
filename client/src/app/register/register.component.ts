import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private location: Location,
    private authService: AuthserviceService,
    private router: Router
  ) { }

  fname: string
  lname: string
  email: string
  password: string
  message



  ngOnInit() {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)])
    });
  }
  public onCancel = () => {
    this.router.navigate(['/index'])
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  onRegisterSubmit(form) {
    const user = {
      email: this.registerForm.get('email').value,
      fname: this.registerForm.get('fname').value,
      lname: this.registerForm.get('lname').value,
      password: this.registerForm.get('password').value
    }

    console.log(user)
    this.authService.onRegisterSubmit_data(user).subscribe(data => {
      console.log(data)
      console.log(data.success)
      var vdata={}
      vdata=data
       if(vdata['success']==true){
         this.message=vdata['message']
         setTimeout(() => {
          this.router.navigate(['/login'])
        }, 2000)
       }else{
        this.message=vdata['message']
       }
      console.log(vdata['success'])
    })
  }

}
