import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-add',
  templateUrl: './manageusers-add.component.html'
})
export class ManageUsersAddComponent implements OnInit, OnDestroy {
 
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiService,
    private titleService: Title
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new System User');
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new System User');
  }
  
  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
  }

}
