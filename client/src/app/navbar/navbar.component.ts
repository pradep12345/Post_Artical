import { Component, OnInit } from '@angular/core';

import { AuthserviceService } from '../services/authservice.service'
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private location: Location,  private router: Router,
    public authService: AuthserviceService) { }

    logout() {
      
     localStorage.clear();
     this.router.navigate(['/index'])
     location.reload()
     
    }
  ngOnInit() {
  
  }


}
