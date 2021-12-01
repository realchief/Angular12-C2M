import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'app-interface-grid',
    templateUrl: './interface-grid.component.html'
})
export class InterfaceGridComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;
    closeResult: string = '';


    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private apiService: ApiService,
        private titleService: Title,
        private modalService: NgbModal
    ) {
        sessionStorage.setItem('AppTitle', 'Data Interface');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Data Interface');
        this.getAllCompany();
    }


    private getAllCompany() {
        // const apikey = 'bIPXlfzvB1kHilurK4s@jjnOiDCoVQ';
        const apikey = localStorage.getItem("APIKey");
        this.apiService.get('GetCompanies', {'apiKey': apikey, 'companyname': ''})
            .subscribe(res => {                
                this.dataSource = res.data.companies.company;
                console.log(this.dataSource);
            }, error => {
                console.log(error);
            });

    }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }

    uploadPicture() {
      debugger;
        const imgInt = <HTMLInputElement> document.getElementById('company-image');
        const file = imgInt.files
        if (file) {
            const previewEle = <HTMLImageElement>document.getElementById('preview-show');
            previewEle.src = URL.createObjectURL(file[0])
        }

    }

    open(content:any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
          return  `with: ${reason}`;
        }
      }

}
