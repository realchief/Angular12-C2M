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
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { xml2json } from 'xml-js';


const getTreeviewData = (json: any, parentValue: number): any => {
  if (Array.isArray(json)) {
    return getTreeviewData(json[0], parentValue)
  }
  const data = Object.keys(json).map((key, index) => {
    if (typeof json[key] === 'object') {
      return {
        text: key,
        value: parentValue * 10 + (index + 1),
        children: getTreeviewData(json[key], parentValue * 10 + (index + 1))
      }
    } else {
      return {
        text: key,
        value: parentValue * 10 + (index + 1),
      }
    }
  })
  return data
}

@Component({
  selector: 'app-device-channel-add',
  templateUrl: './device-channel-add.component.html',
  styleUrls: ['./device-channel-add.component.css']
})
export class DeviceChannelAddComponent implements OnInit, OnDestroy {

  addChannelForm: FormGroup;
  addCommandForm: FormGroup;
  addCommandGroupForm: FormGroup;
  addFotaGroupForm: FormGroup;
  addJsonFeedForm: FormGroup;
  addNativeAppForm: FormGroup;
  addResourceForm: FormGroup;
  addMarketingDocForm: FormGroup;
  addBlogForm: FormGroup;
  addForumForm: FormGroup;
  addVideoForm: FormGroup;

  submitted = false;
  command_submitted = false;
  command_group_submitted = false;
  fota_group_submitted = false;
  json_feed_submitted = false;
  submitted_app = false;
  submitted_resource = false;
  submitted_marketing_doc = false;
  submitted_blog = false;
  submitted_forum = false;
  submitted_video = false;
  schemaOption = false;
  JSONSchemaOptionSubmitted = false;
  XMLSchemaOptionSubmitted = false;
  jsonSchemaGeneratingError = false;
  xmlSchemaGeneratingError = false;

  isCreatingFailed = false;
  identifierError = false;
  errorMessage = '';
  countries: any[] = [];
  checked = true;
  permissions = [
    { id: 1, value: "Public" },
    { id: 2, value: "Private" },
    { id: 3, value: "Company" }
  ];
  channel_cateogry_list = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprise APIs" }
  ];
  channel_type_list = [
    { id: 1, value: "Software" },
    { id: 2, value: "Device" },
    { id: 3, value: "Sensor" },
    { id: 4, value: "Parts/Kits" },
    { id: 5, value: "Services" },
    { id: 6, value: "Networks" },
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
  unit_increment_list = [
    { id: 1, value: "Second" },
    { id: 2, value: "Min" },
    { id: 3, value: "Hour" },
    { id: 4, value: "Day" },
    { id: 5, value: "Month" },
    { id: 6, value: "Year" },
    { id: 7, value: "N/A" },

  ];
  access_token_list = [
    { id: 1, value: "Heather" },
    { id: 2, value: "Query String" },
    { id: 3, value: "Other" }
  ];
  secrete_key_list = [
    { id: 1, value: "api_secret" },
    { id: 2, value: "client_secret" },
    { id: 3, value: "Other" }
  ];
  key_list = [
    { id: 1, value: "api_key" },
    { id: 2, value: "client_id" },
    { id: 3, value: "Other" }
  ];
  network_protocol_list = [
    { id: 0, value: "Select Protocol" },
    { id: 1, value: "2G" },
    { id: 2, value: "3G" },
    { id: 3, value: "ANT" },
    { id: 4, value: "Bluetooth" },
    { id: 5, value: "Ethernet-IPv4, IPv6" },
    { id: 6, value: "GPRS" },
    { id: 7, value: "Low Bluetooth" },
    { id: 8, value: "NFC" },
    { id: 9, value: "RFID" },
    { id: 10, value: "SNMP" },
    { id: 8, value: "WIFI" },
    { id: 9, value: "ZigBee" },
    { id: 10, value: "Zwave" },
  ];
  bytes_data_type_list = [
    { id: 1, value: "Binaly" },
    { id: 2, value: "Hexadecimal" },
    { id: 3, value: "Octal" },
  ];
  connection_type_list = [
    { id: 0, value: "Select Connection Type" },
    { id: 1, value: "Native" },
    { id: 2, value: "connect2.me" },
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
  data_type_list = [
    { id: 1, value: "bool" },
    { id: 2, value: "byte" },
    { id: 3, value: "ccid" },
    { id: 4, value: "datetime" },
    { id: 5, value: "double" },
    { id: 6, value: "float" },
    { id: 7, value: "imei" },
    { id: 8, value: "int" },
    { id: 9, value: "ip" },
    { id: 10, value: "long" },
    { id: 11, value: "mac" },
    { id: 12, value: "short" },
    { id: 13, value: "string" },
  ];
  command_group_mode_list = [
    { id: 1, value: "API" },
    { id: 2, value: "Code" },
    { id: 3, value: "MQTT" },
    { id: 4, value: "SMS" },
    { id: 5, value: "TCP" },
    { id: 5, value: "UDP" },
  ];
  fota_group_mode_list = [
    { id: 1, value: "API" },
    { id: 2, value: "Code" },
    { id: 3, value: "MQTT" },
    { id: 4, value: "SMS" },
    { id: 5, value: "TCP" },
    { id: 5, value: "UDP" },
  ];
  command_info_list = [
    { id: 1, value: "Command One" },
    { id: 2, value: "Command Two" },
    { id: 3, value: "Command Three" },
    { id: 4, value: "Command Four" },
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

  data_mapping_option = "Manual";
  sample_type = "String";

  MQTT = false;
  TCP = false;
  UDP = false;
  OMA_DM = false;
  HTTP = false;
  HTTPS = false;
  CoAp = false;
  XMPP = false;
  LwM2M = false;
  USER = false;
  EventTriggered = false;
  AutoInitiated = false;
  ExternalCode = false;

  tabLabelList = [
    'Channel Info',
    'Connection',
    'Identification',
    'Data Mapping',
    'Commmands',
    'FOTA',
    'Resources',
  ];

  selectedIndex: number = 0;
  maxNumberOfTabs = 6;
  selectedPermissionValue = 1;
  selectedAppType = 1;
  selectedAuthenticationOption = 0;
  selectedAccessToken = 1;
  selectedSecreteKey = 1;
  selectedKey = 1;
  selectedNetworkProtocol = 0;
  selectedConnectionType = 0;

  numbers = [0];
  ds_numbers = [0];



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
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ]
  };


  AppPath = [
    { "router": "data-interface", "title": "Data Interface" },
    { "router": "data-interface/c2m-di-marketplace", "title": "C2M DI MarketPlace" },
    { "router": "data-interface/c2m-di-marketplace/Microsoft", "title": "Microsoft" }
  ];

  closeResult: string = '';

  items: any;

  simpleItems: any[] = [];



  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 500
  });

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
    const reg_xml = '([^\s\.]*([\s\.]+[^a-z])?)*[\s\.]*';
    const reg_json = '/^\s*\{\s*[A-Z0-9._]+\s*:\s*[A-Z0-9._]+\s*(,\s*[A-Z0-9._]+\s*:\s*[A-Z0-9._]+\s*)*\}\s*$/i';
    const reg_bytes = '[A-Za-z]{3}';
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
      ssl_certificate: [''],
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
      network_protocol: [''],
      connection_type: [''],
      MQTT_endpoint: [''],
      MQTT_port: [''],
      TCP_endpoint: [''],
      TCP_port: [''],
      UDP_endpoint: [''],
      UDP_port: [''],
      OMA_DM_endpoint: [''],
      OMA_DM_port: [''],
      HTTP_endpoint: [''],
      HTTP_port: [''],
      HTTPS_endpoint: [''],
      HTTPS_port: [''],
      CoAp_endpoint: [''],
      CoAp_port: [''],
      XMPP_endpoint: [''],
      XMPP_port: [''],
      LwM2M_endpoint: [''],
      LwM2M_port: [''],
      data_mapping_option: ['', Validators.required],
      device_data_sample: [''],
      xml_data: ['', [Validators.pattern(reg_xml)]],
      json_data: ['', [Validators.pattern(reg_json)]],
      end_text: [''],
      bytes_data: ['', [Validators.pattern(reg_bytes)]],
      bytes_data_value: [''],
      bytes_data_type: [''],
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
    this.addFotaGroupForm = this.formBuilder.group({
      fota_group_name: ['', Validators.required],
      fota_group_mode: [''],
      command_info: [''],
      friendly_name: [''],
    });
    this.addJsonFeedForm = this.formBuilder.group({
      json_feed_name: ['', Validators.required],
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

  getItems(parentChildObj: any) {
    let itemsArray: TreeviewItem[] = [];
    if (Array.isArray(parentChildObj)) {
      parentChildObj.forEach(set => {
        itemsArray.push(new TreeviewItem(set))
      });
    } else {
      itemsArray.push(new TreeviewItem(parentChildObj))
    }
    return itemsArray;
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

  get f_fota_group() {
    return this.addFotaGroupForm.controls;
  }

  get f_json_feed() {
    return this.addJsonFeedForm.controls;
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

  selectCategory() {
    this.data_mapping_option = (<HTMLInputElement>document.querySelector('.data-mapping-option:checked')).value;
    console.log(this.data_mapping_option);
  }

  selectSampleType() {
    this.sample_type = (<HTMLInputElement>document.querySelector('.sample-type:checked')).value;
    console.log(this.sample_type);
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

  generateXMLSchema() {

    this.xmlSchemaGeneratingError = false;
    let json_data_new = {};
    let json_type_input = '';
    try {
      json_type_input = xml2json((<HTMLInputElement>document.querySelector('#xml-data')).value, {compact: true, spaces: 4});
      json_data_new = JSON.parse(json_type_input);
    } catch (exception_var) {
      this.xmlSchemaGeneratingError = true;
    }
    const data = getTreeviewData(json_data_new, 0)    
    this.items = this.getItems(data);
    this.XMLSchemaOptionSubmitted = true;
  }

  generateJSONSchema() {
    this.jsonSchemaGeneratingError = false;
    const json_type_input = (<HTMLInputElement>document.querySelector('#json-data')).value;
    let json_data_new = {};
    try {
      json_data_new = JSON.parse(json_type_input);
    }
    catch (exception_var) {
      this.jsonSchemaGeneratingError = true;
    }
    console.log(this.jsonSchemaGeneratingError);

    const data = getTreeviewData(json_data_new, 0)
    this.items = this.getItems(data);
    this.JSONSchemaOptionSubmitted = true;
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

  onSubmitFotaGroup(): void {
    this.fota_group_submitted = true;
    console.log('Add fota group form has been submitted');
  }

  onSubmitJsonFeed(): void {
    this.json_feed_submitted = true;
    console.log('Add fota group form has been submitted');
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

  addNewForm(): void {
    this.numbers.push(this.numbers[this.numbers.length - 1] + 1);
  }

  removeForm(number: any): void {
    let i = 0;
    for (i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] == number)
        break;
    }
    this.numbers.splice(i, 1);
  }

  addNewDeviceForm(): void {
    this.identifierError = false;
    const first_device_element = document.getElementsByClassName('first-device-indentifiers-div')[0];
    const device_input = <HTMLInputElement>(first_device_element.querySelector('.device_identifiers'));
    const device_checkbox = <HTMLInputElement>(first_device_element.querySelector('.device_identifiers_checkbox'));
    const device_select = <HTMLInputElement>(first_device_element.querySelector('#indentification_data_type'));

    if (device_input.value) {
      const new_device_element = <Element>first_device_element.cloneNode(true);
      new_device_element.classList.remove('first-device-indentifiers-div');
      new_device_element.classList.add('another-device-indentifiers-div');
      const new_device_select = <HTMLInputElement>(new_device_element.querySelector('#indentification_data_type'));
      new_device_select.value = device_select.value;
      <Element>(first_device_element.parentNode)?.insertBefore(new_device_element, first_device_element.nextSibling);
      device_input.value = '';
      device_checkbox.checked = false;
      device_select.value = '';

      const new_device_button = <HTMLInputElement>(new_device_element.querySelector('.minuschannel'));
      new_device_button.addEventListener('click', function (event) {
        const current_element = <Element>event.target;
        current_element?.closest('.another-device-indentifiers-div')?.remove();
      });
    } else {
      this.identifierError = true;
    }
  }

  addNewFormDS(): void {
    this.ds_numbers.push(this.ds_numbers[this.ds_numbers.length - 1] + 1);
  }

  removeFormDS(ds_number: any): void {
    let i = 0;
    for (i = 0; i < this.ds_numbers.length; i++) {
      if (this.ds_numbers[i] == ds_number)
        break;
    }
    this.ds_numbers.splice(i, 1);
  }

  editForm(number: any): void {
    let i = 0;
    for (i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] == number)
        break;
    }
    this.numbers.splice(i, 1);
  }

}
