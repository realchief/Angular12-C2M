import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';



@Component({
  selector: 'app-interface-grid',
  templateUrl: './interface-grid.component.html',
  styleUrls: ['./interface-grid.component.css']
})
export class InterfaceGridComponent implements OnInit, OnDestroy {

  categories = [
    { id: 1, value: "Automotive" },
    { id: 2, value: "Database" },
    { id: 3, value: "Gateway" },
    { id: 4, value: "Enterprise APIs" }
  ];

  dataSource: any;
  itemsCount = 0;
  closeResult: string = '';

  addCompanyForm: FormGroup;
  submitted = false;
  isCreatingFailed = false;
  errorMessage = '';

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
    this.addCompanyForm = this.formBuilder.group({
      company_name: ['', Validators.required],
      company_url: ['', [Validators.required, Validators.pattern(reg)]],
      sub_domain: ['', Validators.required],
      category: ['']
    });
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | Microsoft');
    sessionStorage.setItem('AppPath', JSON.stringify(this.AppPath));
    this.getAllCompany();
  }

  get f() {
    return this.addCompanyForm.controls;
  }


  private getAllCompany() {
    // const apikey = 'bIPXlfzvB1kHilurK4s@jjnOiDCoVQ';
    const apikey = localStorage.getItem("APIKey");
    this.apiService.get('GetCompanies', { 'apiKey': apikey, 'companyname': '' })
      .subscribe(res => {
        this.dataSource = res.data.companies.company;
        console.log(this.dataSource);
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
