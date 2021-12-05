import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from "src/app/_services/auth.service";
import { ApiService } from "src/app/_services/api.service";


@Component({
    selector: "app-menu-right",
    templateUrl: "./menu-right.component.html",
    styleUrls: ['./menu-right.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class MenuRightComponent implements OnInit {

    addCompanyForm: FormGroup;
    submitted = false;
    isCreatingFailed = false;
    errorMessage = '';

    categories = [
        { id: 1, value: "Automotive" },
        { id: 2, value: "Database" },
        { id: 3, value: "Gateway" },
        { id: 4, value: "Enterprise APIs" }
    ];

    companynames = [
        'Microsoft',
        'Oracle',
        'Plasma Computing Group',
        'Microsoft',
        'Oracle',
        'Plasma Computing Group',
        'Microsoft',
        'Oracle',
        'Plasma Computing Group',
        'Microsoft',
        'Oracle',
        'Plasma Computing Group'
    ]

    searchText = '';

    closeResult: string = '';

    constructor(
        private modalService: NgbModal,
        private http: HttpClient,
        private _location: Location,
        private formBuilder: FormBuilder,
        private router: Router,
        private titleService: Title,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private apiService: ApiService,
    ) {
        this.addCompanyForm = this.formBuilder.group({
            company_name: ['', Validators.required],
            company_url: ['', Validators.required],        
            sub_domain: ['', Validators.required],
            category: ['']
        });
    }
    ngOnInit() {

    }

    get f() {
        return this.addCompanyForm.controls;
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
        console.log('submitted');
        this.submitted = true;
    }

    reloadPage(): void {
        window.location.reload();
    }

}