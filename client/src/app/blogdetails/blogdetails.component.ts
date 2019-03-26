import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../services/authservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.scss']
})
export class BlogdetailsComponent implements OnInit {


  public newpostForm: FormGroup;
  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthserviceService,
    private router: Router) { }
    currentUrl
    message
    blog
    username
  ngOnInit() {
    if (localStorage.length > 0) {
      let item = JSON.parse(localStorage.getItem("user"))
      this.username = item.FirstName
    }
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.getSingleBlog(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.message = "Blog not Found"
      } else {
        this.blog = data.blog;
      }
    })
    this.newpostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
      body: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(2000)]),
      link: new FormControl(''),
      coments:new FormControl(''),
    });

    this.newpostForm.controls["title"].disable();
    this.newpostForm.controls["body"].disable();
    this.newpostForm.controls["link"].disable();
  }

  onComment() {

    var textareavalue = this.blog.coments.replace(/(?:\r\n|\r|\n)/g, '\n')
    const blog = {
      _id: this.blog._id,
      comment: this.blog.coments,
      createdBy: this.username
    }
    this.authService.comment(this.blog).subscribe(data => {
     if (!data.success) {
        this.message = data.message;

      } else {
        this.message = data.message;
        
        this.router.navigate(['/detail-blog/',this.blog._id])
        // this.router.navigate(['/dashboard'])
      }
    })

  }

  public onCancel = () => {
    
  }
}
