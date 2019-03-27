import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../services/authservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.scss']
})
export class EditblogComponent implements OnInit {

  currentUrl;
  message;
  blog;
  username;
  title;
  body;
  public newpostForm: FormGroup;
  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthserviceService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.length > 0) {
      let item = JSON.parse(localStorage.getItem("user"))
      this.username = item.FirstName
      this.currentUrl = this.activatedRoute.snapshot.params;
      this.authService.getSingleBlog(this.currentUrl.id).subscribe(data => {
        if (!data.success) {
          this.message = "Blog not Found"
        } else {
          this.blog = data.blog;
        }
      })
    } else {
      this.router.navigate(['/index'])
    }
    this.newpostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      body: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]),
      link: new FormControl('')
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.newpostForm.controls[controlName].hasError(errorName);
  }

  
  onEditPost() {

    var textareavalue = this.blog.body.replace(/(?:\r\n|\r|\n)/g, '\n')
    const blog = {
      _id: this.blog._id,
      title: this.blog.title,
      link: this.blog.link,
      body: textareavalue,
      createdBy: this.username
    }
    this.authService.editBlog(this.blog).subscribe(data => {
     if (!data.success) {
        this.message = data.message;

      } else {
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/index'])
        }, 2000)
      }
    })

  }

  public onCancel = () => {
    this.router.navigate(['/index'])
  }

}
