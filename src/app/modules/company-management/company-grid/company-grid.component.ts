import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-company-grid',
    templateUrl: './company-grid.component.html'
})
export class CompanyGridComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private apiService: ApiService,
        private titleService: Title
    ) {
        sessionStorage.setItem('AppTitle', 'Manage Company');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage Company');
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

}
