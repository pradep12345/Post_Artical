import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../services/authservice.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public dashboardForm: FormGroup;
  constructor(
    private location: Location,
    private authService: AuthserviceService,
    private router: Router) { }


  ngOnInit() {
    this.getAllBlogs()
  }
  username
  blogPosts
  getAllBlogs() {
    if (localStorage.length > 0) {
      let item = JSON.parse(localStorage.getItem("user"))
      console.log(item.FirstName)
      this.username = item.FirstName
    }
    this.authService.getAllBlogs().subscribe(data => {
      console.log(data)
      this.blogPosts = data.blogs
    })
  }
}
