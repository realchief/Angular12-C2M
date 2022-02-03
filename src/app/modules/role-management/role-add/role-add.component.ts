import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';


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

  app_type_list = [
    { id: 1, value: "option 1" },
    { id: 2, value: "option 2" },
    { id: 3, value: "option 3" },
    { id: 4, value: "option 4" },
    { id: 5, value: "option 5" }
  ];

  constructor(
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
