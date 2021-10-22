import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { ApiService } from "src/app/_services/api.service";


@Component({
  selector: 'app-app-add',
  templateUrl: './app-add.component.html'
})
export class AppAddComponent implements OnInit {

  addAppForm: FormGroup;
  form: any = {
    username: null,
    password: null
  };
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  patient_application_list = [
    { id: 1, value: "application 1" },
    { id: 2, value: "application 2" },
    { id: 3, value: "application 3" },
    { id: 4, value: "application 4" },
    { id: 5, value: "application 5" }
  ];
  sort_order_list = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
    { id: 8, value: "8" },
    { id: 9, value: "9" },
  ];
  constructor(
    private http: HttpClient,
    private _location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
  ) {
    this.getCountries();
    this.addAppForm = this.formBuilder.group({
      logo: ['', Validators.required],
      patient_application: ['', Validators.required],
      application_name: ['', Validators.required],
      friendly_name: ['', Validators.required],
      short_description: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      sort_order: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  get f() {
    return this.addAppForm.controls;
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
      PolicyBundleIdntryId: this.f.patient_application.value,
      ZipCode: this.f.zip_code.value,
      Address1: this.f.address1.value,
      Address2: this.f.address2.value,
      StateId: this.f.state.value,
      WebURL: this.f.company_url.value,
      city: this.f.city.value,
      emailaddress: this.f.emailaddress.value,
      logo: this.f.logo.value,
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

  reloadPage(): void {
    window.location.reload();
  }

}
