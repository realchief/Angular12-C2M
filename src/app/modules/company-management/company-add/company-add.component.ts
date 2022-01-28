import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { AuthService } from "src/app/_services/auth.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Title } from '@angular/platform-browser';
import { ApiService } from "src/app/_services/api.service";


@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html'
})
export class CompanyAddComponent implements OnInit {

  addCompanyForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  states: any[] = [];
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
    private http: HttpClient,
    private _location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
  ) {
    sessionStorage.setItem('AppTitle', 'Add a new Company');
    this.getCountries();
    this.addCompanyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_url: ['', Validators.required],
      emailaddress: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      assign_space: ['', Validators.required],
      assign_space_unit: ['', Validators.required],
      policy_bundle: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new Group');
    this.getStateListByCountryId(120);
  }

  get f() {
    return this.addCompanyForm.controls;
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

  getStateListByCountryId(countryCode: any) {
    this.apiService.get('GetStateListByCountryId', { 'CountryCode': countryCode })
      .subscribe(res => {
        console.log(res.data);
        this.states = res.data.States.State;
      }, error => {
        console.log(error);
      });
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

  reloadPage(): void {
    window.location.reload();
  }

}
