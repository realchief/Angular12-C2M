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
  selector: 'app-analytic-add',
  templateUrl: './analytic-add.component.html',
  styleUrls: ['./analytic-add.component.css']
})
export class AnalyticAddComponent implements OnInit, OnDestroy {

  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';

  selectedIndex: number = 0;
  maxNumberOfTabs = 4;

  request_type_list = [
    { id: 1, value: "GET" },
    { id: 2, value: "POST" },
    { id: 3, value: "PUT" },
    { id: 4, value: "PATCH" },
    { id: 5, value: "DELETE" },
  ];

  request_info_list = [
    { method: "GET", name: "My Feed", url: "https://api/jobinfo/all" },
    { method: "POST", name: "Create a new API", url: "https://api/create" },
    { method: "PUT", name: "Update existing API", url: "https://api/edit/5" },
    { method: "PATCH", name: "Business Update", url: "https://api/business/edit" },
    { method: "DELETE", name: "Delete invalid channels", url: "https://api/bad_channels/remove" },
  ];

  tabLabelList = [
    'Header Parameter',
    'Template Parameter',
    'Query Parameter',
    'Body Parameter'
  ];

  numbers = [0];

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
    { "router": "data-interface/C2M-DI-MarketPlace", "title": "C2M DI MarketPlace" },
    { "router": "data-interface/C2M-DI-MarketPlace/Microsoft", "title": "Microsoft" },
    { "router": "data-interface/C2M-DI-MarketPlace/Microsoft/add-api-channel", "title": "Add API Channel" }
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
    sessionStorage.setItem('AppTitle', 'Add Analytic');
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Add Analytic');
    sessionStorage.setItem('AppPath', JSON.stringify(this.AppPath));
  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
    sessionStorage.removeItem('AppPath');
  }

  backClicked() {
    this._location.back();
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

  onSubmit(): void {
    this.submitted = true;
    console.log('submitted');
  }

  addNewForm() :void {
    this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
  }

  removeForm(number : any) :void {
    let i = 0;
    for(i = 0; i < this.numbers.length; i ++){
      if(this.numbers[i] == number)
        break;
    }
    this.numbers.splice(i, 1);
  }

  editForm(number : any) :void {
    let i = 0;
    for(i = 0; i < this.numbers.length; i ++){
      if(this.numbers[i] == number)
        break;
    }
    this.numbers.splice(i, 1);
  }

}
