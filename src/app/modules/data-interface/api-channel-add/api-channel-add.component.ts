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
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


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
  closeResult: string = '';
  permissions = [
    { id: 1, value: "Public" },
    { id: 2, value: "Private" },
    { id: 3, value: "Company" }
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
    { id: 1, value: "All" },
    { id: 2, value: "Day" },
    { id: 3, value: "Week" },
    { id: 4, value: "Month" },
    { id: 5, value: "Year" }
  ];
  category_list = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprice APIs" }
  ];
  unit_increment_list = [
    { id: 1, value: "Second" },
    { id: 2, value: "Minute" },
    { id: 3, value: "Hour" },
    { id: 4, value: "Day" },
    { id: 5, value: "Month" },
    { id: 6, value: "Year" },
    { id: 7, value: "N/A" }
  ];
  authentication_list = [
    { id: 0, value: "Select Auth Type" },
    { id: 1, value: "Basic" },
    { id: 2, value: "Digist" },
    { id: 3, value: "0Auth 1.0" },
    { id: 4, value: "0Auth 1.0a" },
    { id: 5, value: "0Auth 2.0" },
    { id: 6, value: "Non-Authenticated" }
  ];
  key_list = [
    { id: 1, value: "api_key" },
    { id: 2, value: "client_id" },
    { id: 3, value: "Other" }
  ];
  secrete_key_list = [
    { id: 1, value: "api_secret" },
    { id: 2, value: "client_secret" },
    { id: 3, value: "Other" }
  ];
  access_token_list = [
    { id: 1, value: "Heather" },
    { id: 2, value: "Query String" },
    { id: 3, value: "Other" }
  ];

  request_format_list = [
    { id: 1, value: "GET" },
    { id: 2, value: "POST" },
    { id: 3, value: "PUT" },
    { id: 4, value: "PATCH" },
    { id: 5, value: "DELETE" },
  ];

  selectedPermissionValue = 1;
  selectedAuthenticationOption = 0;
  selectedSecreteKey = 1;
  selectedAccessToken = 1;
  selectedKey = 1;

  tabLabelList = [
    'Channel Info',
    'Connection',
    'Analytics',
    'Resources'
  ];

  homeParameterTabLabelList = [
    'Header Parameter',
    'Template Parameter',
    'Query Parameter',
    'Body Parameter'
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
    private modalService: NgbModal,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
  ) {
    sessionStorage.setItem('AppTitle', 'Add Channel');
    this.getCountries();
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
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
      request_token_url: ['', [Validators.pattern(reg)]],
      access_token_url: ['', [Validators.pattern(reg)]],
      scope: [''],
      credential: [''],
      authentication: [''],
      key: [''],
      secrete_key: [''],
      access_token: [''],
      authorization_url: ['', [Validators.pattern(reg)]],
      rss_feed_url: ['', [Validators.pattern(reg)]],
      buy_it_url: ['', [Validators.pattern(reg)]],
      subscribe_url: ['', [Validators.pattern(reg)]]
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

  onPermissionChanged() {
    console.log('onPermissionChanged');
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

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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

  gotoAddNewAnalytic(): void {
    this.router.navigate(['/data-interface/C2M-DI-MarketPlace/Microsoft/add-api-channel/add-analytic']);
  }

}
