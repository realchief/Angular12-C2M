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
  selector: 'app-file-channel-add',
  templateUrl: './file-channel-add.component.html',
  styleUrls: ['./file-channel-add.component.css']
})
export class FileChannelAddComponent implements OnInit, OnDestroy {

  addChannelForm: FormGroup;
  addCommandForm: FormGroup;
  addCommandGroupForm: FormGroup;
  addNativeAppForm: FormGroup;
  addResourceForm: FormGroup;
  addMarketingDocForm: FormGroup;
  addBlogForm: FormGroup;
  addForumForm: FormGroup;
  addVideoForm: FormGroup;  

  submitted = false;
  command_submitted = false;
  command_group_submitted = false;
  submitted_app = false;
  submitted_resource = false;
  submitted_marketing_doc = false;
  submitted_blog = false;
  submitted_forum = false;
  submitted_video = false;
  isCreatingFailed = false;
  errorMessage = '';
  countries: any[] = [];
  checked = true;
  selectedAppType = 1;



  permissions = [
    { id: 1, value: "Public" },
    { id: 2, value: "Private" },
    { id: 3, value: "Company" }
  ];
  channel_type_list = [
    { id: 1, value: "CSV" },
    { id: 2, value: "JSON" },
    { id: 3, value: "PDF" },
    { id: 4, value: "JPEG" },
    { id: 5, value: "PNG" },
    { id: 6, value: "XLSX" },
    { id: 7, value: "ZIP" },
    { id: 8, value: "TAR" },
    { id: 9, value: "GIF" },
    { id: 10, value: "TIFF" }
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
    { id: 5, value: "Year" },
  ];

  resource_type_list = [
    { id: 1, value: "Code Snippet" },
    { id: 2, value: "File" },
    { id: 3, value: "Code Snippet URL" },
    { id: 4, value: "Sdk URL" },
  ];

  app_type_list = [
    { id: 1, value: "Windows" },
    { id: 2, value: "iOS" },
    { id: 3, value: "Android" },
    { id: 4, value: "BlackBerry" },
    { id: 5, value: "Firefox OS" },
    { id: 6, value: "Symbian OS" },
    { id: 6, value: "webOS" },
  ];

  tabLabelList = [
    'Channel Info',
    'Resources'
  ];

  

  selectedIndex: number = 0;
  maxNumberOfTabs = 2;
  selectedPermissionValue = 1;

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
    private titleService: Title,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private apiService: ApiService,
    private modalService: NgbModal,
  ) {
    sessionStorage.setItem('AppTitle', 'Add Channel');
    this.getCountries();
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.addChannelForm = this.formBuilder.group({
      channel_name: ['', Validators.required],
      permission: [''],
      ttl_period: [''],
      channel_description: [''],
      channel_tags: [''],
      navigation_tab: [''],
      channel_ttl_rate: [''],
      channel_navigation_tab: [''],
      image: ['', Validators.required],
      rss_feed_url: ['', [Validators.pattern(reg)]],
      buy_it_url: ['', [Validators.pattern(reg)]],
      subscribe_url: ['', [Validators.pattern(reg)]]
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
    this.addNativeAppForm = this.formBuilder.group({
      app_url: ['', [Validators.required, Validators.pattern(reg)]],    
      app_type: ['', Validators.required],
    });
    this.addResourceForm = this.formBuilder.group({
      resource_name: ['', Validators.required],    
      resource_type: ['', Validators.required],
      resource_description: ['']
    });
    this.addMarketingDocForm = this.formBuilder.group({
      marketing_doc_url: ['', [Validators.required, Validators.pattern(reg)]],    
      marketing_doc_description: ['']
    });
    this.addBlogForm = this.formBuilder.group({
      blog_url: ['', [Validators.required, Validators.pattern(reg)]],    
      blog_description: ['']
    });
    this.addForumForm = this.formBuilder.group({
      forum_url: ['', [Validators.required, Validators.pattern(reg)]],    
      forum_description: ['']
    });
    this.addVideoForm = this.formBuilder.group({
      video_title: ['', Validators.required],    
      video_description: [''],
      video_url: ['', [Validators.required, Validators.pattern(reg)]],  
      video_embedded_cdde: ['', [Validators.required, Validators.pattern(reg)]],     
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

  get f_app() {
    return this.addNativeAppForm.controls;
  }

  get f_resource() {
    return this.addResourceForm.controls;
  }

  get f_marketing_doc() {
    return this.addMarketingDocForm.controls;
  }

  get f_blog() {
    return this.addBlogForm.controls;
  }

  get f_video() {
    return this.addVideoForm.controls;
  }

  get f_forum() {
    return this.addForumForm.controls;
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

  onSubmitCommand(): void {
    this.command_submitted = true;
    console.log('Add command form has been submitted');
  }

  onSubmitCommandGroup(): void {
    this.command_group_submitted = true;
    console.log('Add command group form has been submitted');
  }

  onSubmitApp(): void {
    this.submitted_app = true;
  }

  onSubmitMarketingDoc(): void {
    this.submitted_marketing_doc = true;
  }

  onSubmitBlog(): void {
    this.submitted_blog = true;
  }

  onSubmitForum(): void {
    this.submitted_forum = true;
  }

  onSubmitVideo(): void {
    this.submitted_video = true;
  }

  onSubmitResource(): void {
    this.submitted_resource = true;
  }

  reloadPage(): void {
    window.location.reload();
  }

}
