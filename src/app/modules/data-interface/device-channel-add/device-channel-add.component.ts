import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  selector: 'app-device-channel-add',
  templateUrl: './device-channel-add.component.html',
  styleUrls: ['./device-channel-add.component.css']
})
export class DeviceChannelAddComponent implements OnInit, OnDestroy {

  addChannelForm: FormGroup;
  addCommandForm: FormGroup;
  addCommandGroupForm: FormGroup;

  submitted = false;
  command_submitted = false;
  command_group_submitted = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  checked = true;
  permissions = [
    { id: 1, value: "Admin" },
    { id: 2, value: "Management" },
    { id: 3, value: "General" }
  ];
  channel_cateogry_list = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprise APIs" }
  ];
  channel_type_list = [
    { id: 1, value: "Input Device" },
    { id: 2, value: "Output Device" }
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
  unit_increment_list = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" }
  ];
  access_token_list = [
    { id: 1, value: "access token 1" },
    { id: 2, value: "access token 2" },
    { id: 3, value: "access token 3" },
    { id: 4, value: "access token  4" }
  ];
  secrete_key_list = [
    { id: 1, value: "secet key 1" },
    { id: 2, value: "secet key 2" },
    { id: 3, value: "secet key 3" },
    { id: 4, value: "secet key 4" }
  ];
  key_list = [
    { id: 1, value: "key1" },
    { id: 2, value: "key2" },
    { id: 3, value: "key3" },
    { id: 4, value: "key4" }
  ];
  authentication_list = [
    { id: 1, value: "Yes" },
    { id: 2, value: "No" }
  ];
  data_type_list = [
    { id: 1, value: "BOOL" },
    { id: 2, value: "INT" },
    { id: 3, value: "FLOAT" },
    { id: 4, value: "VARCHAR" },
    { id: 5, value: "LONGTEXT" },
    { id: 6, value: "ARRAY" },
    { id: 7, value: "DATE" },
    { id: 8, value: "ENUMERATED" }
  ];
  command_group_mode_list = [
    { id: 1, value: "Mode 1" },
    { id: 2, value: "Mode 2" },
    { id: 3, value: "Mode 3" },
    { id: 4, value: "Mode 4" },
    { id: 5, value: "Mode 5" },
  ];
  command_info_list = [
    { id: 1, value: "Command One" },
    { id: 2, value: "Command Two" },
    { id: 3, value: "Command Three" },
    { id: 4, value: "Command Four" },
  ];


  tabLabelList = [
    'Channel Info',
    'Connection',
    'Identification',
    'Data Mapping',
    'Commmands',
    'Resources',
  ];

  selectedIndex: number = 0;
  maxNumberOfTabs = 6;

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
    { "router": "data-interface/c2m-di-marketplace", "title": "C2M DI MarketPlace" },
    { "router": "data-interface/c2m-di-marketplace/Microsoft", "title": "Microsoft" }
  ];

  closeResult: string = '';

  constructor(
    private http: HttpClient,
    private _location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private titleService: Title,
    private authService: AuthService,
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
      navigation_tab: [''],
      channel_ttl_rate: [''],
      c2m_pass_frequency: [''],
      model_number: ['', Validators.required],
      dataset_feed_merge_count: [''],
      unit_increment: [''],
      channel_category: [''],
      image: ['', Validators.required],
      access_token: [''],
      secrete_key: [''],
      key: [''],
      authentication: [''],
      base_url: ['', [Validators.pattern(reg)]],
      credential: [''],
      consumer_key: [''],
      consumer_secrete_key: [''],
      request_token_url: ['', [Validators.pattern(reg)]],
      access_token_url: ['', [Validators.pattern(reg)]],
      scope: [''],      
      authorization_url: ['', [Validators.pattern(reg)]],
      device_identifiers: [],
      indentification_data_type: [],
      file_data_type: [],
      file_name: [],
      rss_feed_url: ['', [Validators.pattern(reg)]],
      buy_it_url: ['', [Validators.pattern(reg)]],
      subscribe_url: ['', [Validators.pattern(reg)]],
      data_mapping_option: [''],
    });
    this.addCommandForm = this.formBuilder.group({
      command_name: ['', Validators.required],
      command_file_name: [],
      command_data_type: [],
    });
    this.addCommandGroupForm = this.formBuilder.group({
      command_group_name: ['', Validators.required],
      command_group_mode: [''],      
      command_info: [''],   
      friendly_name: [''],   
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

  get f_command() {
    return this.addCommandForm.controls;
  }

  get f_command_group() {
    return this.addCommandGroupForm.controls;
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
  clickInputFileButton() {
    const fileInt = <HTMLInputElement>document.getElementById('xmlfile');
    fileInt.click();
  }

  clickInputCommandFileButton() {
    const fileInt = <HTMLInputElement>document.getElementById('commandfile');
    fileInt.click();
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

  onSubmitCommand(): void {
    this.command_submitted = true;
    console.log('Add command form has been submitted');
  }

  onSubmitCommandGroup(): void {
    this.command_group_submitted = true;
    console.log('Add command group form has been submitted');
  }

  reloadPage(): void {
    window.location.reload();
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
