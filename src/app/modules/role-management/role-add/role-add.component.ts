import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
import { ConfirmedValidator } from 'src/app/auth/confirmed.validator';


@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html'
})
export class RoleAddComponent implements OnInit, OnDestroy {

  addRoleForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  companies: any[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiService,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new Role');
    this.addRoleForm = this.formBuilder.group({
        role_name: ['', Validators.required],
        friendly_name: ['', Validators.required],
        description: ['', Validators.required],
        app_type: ['', Validators.required]      
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new Role');
  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
  }

  get f() {
    return this.addRoleForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
  }

}
