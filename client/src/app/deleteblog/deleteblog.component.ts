import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'
@Component({
  selector: 'app-deleteblog',
  templateUrl: './deleteblog.component.html',
  styleUrls: ['./deleteblog.component.scss']
})
export class DeleteblogComponent implements OnInit {

  public newpostForm: FormGroup;
  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthserviceService,
    private router: Router) { }
  username;
  currentUrl;
  message;
  blog;
  disableblog=false
  ngOnInit() {
    this.disableblog=true
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
      this.router.navigate(['/dashboard'])
    }
    this.newpostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      body: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]),
      link: new FormControl('')
      
    });

    this.newpostForm.controls["title"].disable();
    this.newpostForm.controls["body"].disable();
    this.newpostForm.controls["link"].disable();
  }


  onDeletePost() {

    
    const blog = {
      _id: this.blog._id
    }
    this.authService.deleteBlog(this.blog._id).subscribe(data => {
     if (!data.success) {
        this.message = data.message;

      } else {
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 2000)
      }
    })

  }
  public onCancel = () => {
    this.router.navigate(['/dashboard'])
  }
}
