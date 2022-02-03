import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-systemusers-add',
  templateUrl: './systemusers-add.component.html'
})
export class SystemUsersAddComponent implements OnInit, OnDestroy {
 
  constructor(
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
