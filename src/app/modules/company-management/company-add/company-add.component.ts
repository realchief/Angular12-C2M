import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { ApiService } from "src/app/_services/api.service";


@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent implements OnInit {

  addContactForm: FormGroup;
  form: any = {
    username: null,
    password: null
  };
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  countries : any[] = [];
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
    private _location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
  ) {
    this.getCountries();
    this.addContactForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_url: ['', Validators.required],
      emailaddress: ['', Validators.required],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      assign_space: ['', Validators.required],
      policy_bundle: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.addContactForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  getCountries() {
    let payload = {}
    this.apiService.postWithOutHeader('GetCountryList', payload).subscribe(
      data => {        
        if (data.status == 'SUCCESS') {
          this.countries = data.data.Countries.Country;
        } else {
          this.errorMessage = data.message;
          this.isLoginFailed = true;
        }
      }, err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }


  onSubmit(): void {
    // const { username, password } = this.form;
    // this.apiService.post(username, password).subscribe(
    //   data => {
    //     console.log(data.status);
    //     if (data.status == 'SUCCESS') {
    //       localStorage.setItem('APIKey', data.data.Login.APIKey);
    //       localStorage.setItem('Email', username);
    //       this.router.navigate(['']);
    //       this.isLoggedIn = true;
    //       this.tokenStorage.store_token(environment.Setting.ADMIN_USERNAME, environment.Setting.ADMIN_USER_PASSWORD).subscribe(
    //         data => {
    //           localStorage.setItem('AccessToken', data.data.Tokens.AccessToken);
    //         }
    //       )
    //     } else {
    //       this.errorMessage = data.message;
    //       this.isLoginFailed = true;
    //     }
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
