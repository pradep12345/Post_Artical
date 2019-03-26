import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../services/authservice.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewpostComponent implements OnInit {
  public newpostForm: FormGroup;
  constructor(
    private location: Location,
    private authService: AuthserviceService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.length > 0) {
      let item = JSON.parse(localStorage.getItem("user"))
      console.log(item.FirstName)
      this.username = item.FirstName
    }else{
      
      this.router.navigate(['/dashboard'])
    }
    this.newpostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      body: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)])

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.newpostForm.controls[controlName].hasError(errorName);
  }

  textareavalue
  message
  username
  onNewPostSubmit() {



      var textareavalue = this.textareavalue.replace(/(?:\r\n|\r|\n)/g, '\n')
      const blog = {
        title: this.newpostForm.get('title').value,
        body: textareavalue,
        createdBy: this.username
      }
      console.log(blog)
      this.authService.newBlog(blog).subscribe(data => {
        var vdata = {}
        vdata = data
        if (vdata['success'] == true) {
          this.message = vdata['message']
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 2000)
        } else {
          this.message = vdata['message']
        }
      })
    
  }




  // ccc() {
  //   console.log(this.textareavalue)
  //   var a = this.textareavalue.replace(/(?:\r\n|\r|\n)/g, '\\n')

  //   console.log(a)
  // }
}
