import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: "app-header-nav",
  templateUrl: "./header-nav.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit {

  ishidden = false;
  userdropdown_hidden = false;
  currentUser: any;
  get title() {
    return sessionStorage.getItem('AppTitle');
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.getUserProfile();
  }
  ngOnInit() {

  }

  show(): void {
    this.ishidden = !this.ishidden;
  }

  logout(): void {
    localStorage.removeItem('APIKey');
    this.router.navigate(['/login']);  
  }

  userdropdown_show(): void {
    this.userdropdown_hidden = !this.userdropdown_hidden;
  }

  getUserProfile() {
    const email = localStorage.getItem('Email');
    const accessToken = localStorage.getItem('AccessToken');
    const apiKey = localStorage.getItem('APIKey');

    const body = {
      "EmailAddress": email,
      "AccessToken": accessToken,
      "APIKey": apiKey
    }
    const getProcessSubr = this.userService.getUserProfile(body)
      .subscribe(data => {
        if (data.code = '8024') {
          this.currentUser = data.data.User;
        }
      });
  }
}