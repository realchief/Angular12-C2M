import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Title } from '@angular/platform-browser';
import { ApiService } from "src/app/_services/api.service";


@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html'
})
export class GroupAddComponent implements OnInit {

  addGroupForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  application_list = [
    { id: 1, value: "Patient Application 1" },
    { id: 2, value: "Patient Application 2" },
    { id: 3, value: "Patient Application 3" },
    { id: 4, value: "Patient Application 4" },
    { id: 5, value: "Patient Application 5" }
  ];

  constructor(
    private _location: Location,
    private formBuilder: FormBuilder,
    private titleService: Title,
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new Group');
    this.addGroupForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      application: ['', Validators.required],
      group_type: ['', Validators.required],
      all_users: ['', Validators.required],
      select_user: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new Group');
  }

  get f() {
    return this.addGroupForm.controls;
  }

  backClicked() {
    this._location.back();
  }
 
  onSubmit(): void {
    this.submitted = true;
  }

  reloadPage(): void {
    window.location.reload();
  }

}
