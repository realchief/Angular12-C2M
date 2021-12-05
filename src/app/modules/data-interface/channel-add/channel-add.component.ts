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
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-channel-add',
  templateUrl: './channel-add.component.html',
  styleUrls: ['./channel-add.component.css']
})
export class ChannelAddComponent implements OnInit {

  addChannelForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  permissions = [
    { id: 1, value: "Admin" },
    { id: 2, value: "Management" },
    { id: 3, value: "General" }
  ];
  channel_type_list = [
    { id: 1, value: "MySQL" },
    { id: 2, value: "PostgreSQL" },
    { id: 3, value: "MongoDB" }
  ];
  navigation_tab_list = [
    { id: 1, value: "Speficiations" },
    { id: 2, value: "API/SDK/Code" },
    { id: 3, value: "Native Apps" },
    { id: 4, value: "News" }
  ];
  channel_ttl_rate_list = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" }
  ];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '550',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ]
  };

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
    this.addChannelForm = this.formBuilder.group({
      channel_name: ['', Validators.required],
      permission: [''],
      channel_type: ['', Validators.required],
      ttl_period: ['', Validators.required],
      channel_description: ['', Validators.required],
      channel_tags: ['', Validators.required],
      navigation_tab: ['', Validators.required],
      channel_ttl_rate: ['', Validators.required],
      channel_navigation_tab: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add a new Group');
  }

  get f() {
    return this.addChannelForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  uploadPicture() {
    const imgInt = <HTMLInputElement>document.getElementById('channel-image');
    const file = imgInt.files
    if (file) {
      const previewEle = <HTMLImageElement>document.getElementById('preview-show');
      previewEle.src = URL.createObjectURL(file[0])
    }

  }

  clickInputButton() {
    const imgInt = <HTMLInputElement>document.getElementById('channel-image');
    imgInt.click();
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

  reloadPage(): void {
    window.location.reload();
  }

}
