import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
import { ConfirmedValidator } from 'src/app/auth/confirmed.validator';


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
  companies: any[] = [];

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

  role_list =
    [
      { id: 1, value: "role 1" },
      { id: 2, value: "role 2" },
      { id: 3, value: "role 3" }
    ];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private titleService: Title,
    private formBuilder: FormBuilder,
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new User');
    this.getCountries();
    this.getAllCompany();
    this.addUserForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      mobile_phone: ['', Validators.required],
      address1: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      assign_space: ['', Validators.required],
      company: ['', Validators.required],
      photo: [''],
      role: ['', Validators.required],      
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      }
    );
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new User');
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

  getAllCompany() {
    const apikey = localStorage.getItem("APIKey");
    this.apiService.get('GetCompanies', { 'apiKey': apikey, 'companyname': '' })
      .subscribe(res => {
        this.companies = res.data.companies.company;
        console.log(this.companies);
      }, error => {
        console.log(error);
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addUserForm.valid) {
      let form_data_payload = {
        FirstName: this.f.first_name.value,
        MiddleName: this.f.middle_name.value,
        LastName: this.f.last_name.value,
        UserName: this.f.user_name.value,
        PhoneNumber: this.f.phone.value,
        PolicyBundleId: "11",
        GroupId: '1464',
        EmailAddress: this.f.email.value,
        RoleIDs: '357,93,365,356',
        EmailBody: "Hi, This is user Email Body defined by himself",
        AccessToken: localStorage.getItem("AccessToken"),
        Subject: this.f.title.value,
        FromEmail: 'E-Saleyard@landmark.com.au'
      }
      this.apiService.postWithOutHeader('SignUpUser', form_data_payload).subscribe(
        data => {
          console.log(data);
          if (data.status == 'SUCCESS') {
            this.router.navigate(['/users']);
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

}
