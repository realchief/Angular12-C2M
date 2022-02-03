import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-interface-grid',
  templateUrl: './interface-grid.component.html',
  styleUrls: ['./interface-grid.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InterfaceGridComponent implements OnInit, OnDestroy {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Calls', 'URL', 'Description'];
  expandedElement: PeriodicElement | null;

  categories = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprise APIs" }
  ];

  channelInfoSource: any;
  itemsCount = 0;
  closeResult: string = '';

  addCompanyForm: FormGroup;
  addReportForm: FormGroup;
  submitted = false;
  submitted_report = false;
  isCreatingFailed = false;
  errorMessage = '';

  tabLabelList = [
    'API',
    'SDK',
    'Code Library'
  ];

  selectedIndex: number = 0;
  maxNumberOfTabs = 3;

  AppPath = [
    { "router": "data-interface", "title": "Data Interface" },
    { "router": "data-interface/c2m-di-marketplace", "title": "C2M DI MarketPlace" }
  ];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private titleService: Title,
    private modalService: NgbModal,
    private _location: Location,
    private formBuilder: FormBuilder,
  ) {
    sessionStorage.setItem('AppTitle', 'Microsoft');
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.expandedElement = null;
    this.addCompanyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_url: ['', [Validators.required, Validators.pattern(reg)]],
      sub_domain: ['', Validators.required],
      category: [''],
      image: ['', Validators.required],
    });
    this.addReportForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      report_category: ['', Validators.required],
      report_description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Microsoft');
    sessionStorage.setItem('AppPath', JSON.stringify(this.AppPath));
    this.getAllChannels();
  }

  get f() {
    return this.addCompanyForm.controls;
  }

  get f_report() {
    return this.addReportForm.controls;
  }

  private getAllChannels() {
    const apikey = localStorage.getItem("APIKey");
    this.apiService.getWithApiKey('v1/getAllChannelsByUserid', { 'apiKey': apikey })
      .subscribe(res => {
        if (res.status == 'SUCCESS') {
          this.channelInfoSource = res.data.root.channel;          
        }
        
      }, error => {
        console.log(error);
      });

  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
    sessionStorage.removeItem('AppPath');
  }

  clickInputButton() {
    const imgInt = <HTMLInputElement>document.getElementById('company-image');
    console.log(imgInt);
    imgInt.click();
  }

  uploadPicture() {
    const imgInt = <HTMLInputElement>document.getElementById('company-image');
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

  onSubmit(): void {
    this.submitted = true;
  }

  onSubmitReport(): void {
    this.submitted_report = true;
  }

  reloadPage(): void {
    window.location.reload();
  }

  gotoDatabaseChannel(): void {
    this.router.navigate(['/data-interface/C2M-DI-MarketPlace/Microsoft/add-db-channel']);
  }

  gotoAPIChannel(): void {
    this.router.navigate(['/data-interface/C2M-DI-MarketPlace/Microsoft/add-api-channel']);
  }

  gotoFileChannel(): void {
    this.router.navigate(['/data-interface/C2M-DI-MarketPlace/Microsoft/add-file-channel']);
  }

  gotoDeviceChannel(): void {
    this.router.navigate(['/data-interface/C2M-DI-MarketPlace/Microsoft/add-device-channel']);
  }

}


export interface PeriodicElement {
  Calls: string;
  URL: string;
  Description: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {
    Calls: 'YoutubeInfo_GET',
    URL: 'https://test.com/youtube/',
    Description: `Hydrogen is a chemical element with symbol H and atomic number 1`
  }, {
    Calls: 'Business_POST',
    URL: 'https://test.com/business/1',
    Description: `Helium is a chemical element with symbol He and atomic number 2.`
  }, {
    Calls: 'Lab_PATCH',
    URL: 'https://test/com/lab/1',
    Description: `Lithium is a chemical element with symbol Li and atomic number 3`
  }, {
    Calls: 'getProfileInfo_GET',
    URL: 'https://user_profile/123',
    Description: `Beryllium is a chemical element with symbol Be and atomic number 4`
  }
];