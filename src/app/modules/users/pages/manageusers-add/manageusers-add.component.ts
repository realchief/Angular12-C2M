import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-users-add',
  templateUrl: './manageusers-add.component.html'
})
export class ManageUsersAddComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];

  policy_bundle_list = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" }
  ];
  state_province_list = [
    { id: 116, value: "A" },
    { id: 2, value: "B" },
    { id: 3, value: "C" },
    { id: 4, value: "D" },
    { id: 5, value: "E" }
  ];

  assign_space_unit_list =
    [
      { id: 1, value: "MB" },
      { id: 2, value: "GB" },
      { id: 3, value: "TB" }
    ];
 
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private apiService: ApiService,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new System User');
    this.getCountries();
    this.addUserForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      address1: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      assign_space: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new System User');
  }
  
  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
  }

  get f() {
    return this.addUserForm.controls;
  }

  getCountries() {
    let payload = {}
    this.apiService.postWithOutHeader('GetCountryList', payload).subscribe(
      data => {
        if (data.status == 'SUCCESS') {
          this.countries = data.data.Countries.Country;
        } else {
          this.errorMessage = data.message;
        }
      }, err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    let form_data_payload = {
      CountryId: this.f.country.value,
      PolicyBundleIdntryId: this.f.policy_bundle.value,
      ZipCode: this.f.zip_code.value,
      Address1: this.f.address1.value,
      Address2: this.f.address2.value,
      StateId: this.f.state.value,
      WebURL: this.f.company_url.value,
      city: this.f.city.value,
      emailaddress: this.f.emailaddress.value,
      CompanyName: this.f.company_name.value,
      Phone: this.f.phone.value,
      CategoryIds: '13,15',
      Description: 'test',
      Domain: '12345678975'
    }
      this.apiService.postWithApiKey('v1/AddCompany', form_data_payload).subscribe(
      data => {
        console.log(data);
        if (data.status == 'SUCCESS') {
          this.router.navigate(['/company']);
        } else {
          this.errorMessage = data.data.response;
          this.isCreatingFailed = true;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCreatingFailed = true;
      }
    );
  }

}
