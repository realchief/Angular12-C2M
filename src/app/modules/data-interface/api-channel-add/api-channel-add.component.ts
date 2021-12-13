import { Component, OnInit, OnDestroy } from '@angular/core';
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
  selector: 'app-api-channel-add',
  templateUrl: './api-channel-add.component.html',
  styleUrls: ['./api-channel-add.component.css']
})
export class APIChannelAddComponent implements OnInit, OnDestroy {

  addChannelForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  checked = true;
  permissions = [
    { id: 1, value: "Admin" },
    { id: 2, value: "Management" },
    { id: 3, value: "General" }
  ];
  channel_type_list = [
    { id: 1, value: "SOAP" },
    { id: 2, value: "XML-RPC" },
    { id: 3, value: "JSON-RPC" },
    { id: 4, value: "REST" }
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
  category_list = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprice APIs" }
  ];
  unit_increment_list = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" }
  ];
  authentication_list = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
  ];
  key_list = [
    { id: 1, value: "key1" },
    { id: 2, value: "key2" },
    { id: 3, value: "key3" },
    { id: 4, value: "key4" }
  ];
  secrete_key_list = [
    { id: 1, value: "secet key 1" },
    { id: 2, value: "secet key 2" },
    { id: 3, value: "secet key 3" },
    { id: 4, value: "secet key 4" }
  ];
  access_token_list = [
    { id: 1, value: "access token 1" },
    { id: 2, value: "access token 2" },
    { id: 3, value: "access token 3" },
    { id: 4, value: "access token 4" }
  ];




  tabLabelList = [
    'Channel Info',
    'Connection',
    'Analytics',
    'Resources'
  ];

  selectedIndex: number = 0;
  maxNumberOfTabs = 4;


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

  AppPath = [
    { "router": "data-interface", "title": "Data Interface" },
    { "router": "data-interface/c2m-di-marketplace", "title": "C2M DI MarketPlace" },
    { "router": "data-interface/c2m-di-marketplace/Microsoft", "title": "Microsoft" }
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
    sessionStorage.setItem('AppTitle', 'Add Channel');
    this.getCountries();
    this.addChannelForm = this.formBuilder.group({
      channel_name: ['', Validators.required],
      permission: [''],
      channel_type: [''],
      ttl_period: [''],
      channel_description: [''],
      channel_tags: [''],
      channel_ttl_rate: [''],
      navigation_tab: [''],
      image: ['', Validators.required],
      category: [''],
      message_second: [''],
      device_pass_frequency: [''],
      unit_increment: [''],
      dataset_feed_merge_count: [''],
      base_url: [''],
      consumer_key: [''],
      consumer_secrete_key: [''],
      request_token_url: [''],
      access_token_url: [''],
      scope: [''],
      credential: [''],
      authentication: [''],
      key: [''],
      secrete_key: [''],
      access_token: [''],
      authorization_url: [''],
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add Channel');
    sessionStorage.setItem('AppPath', JSON.stringify(this.AppPath));
  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
    sessionStorage.removeItem('AppPath');
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

  nextStep() {
    if (this.selectedIndex != this.maxNumberOfTabs) {
        this.selectedIndex = this.selectedIndex + 1;
    }
    console.log(this.selectedIndex);
  }

  previousStep() {
    if (this.selectedIndex != 0) {
        this.selectedIndex = this.selectedIndex - 1;
    }
    console.log(this.selectedIndex);
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
    console.log('submitted');
  }

  reloadPage(): void {
    window.location.reload();
  }

}
