import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';


// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//     { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//     { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//     { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//     { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//     { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//     { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//     { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//     { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//     { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//     { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];



@Component({
    selector: 'app-company-grid',
    templateUrl: './company-grid.component.html'
})
export class CompanyGridComponent implements OnInit, OnDestroy {

    companyInfoList: any;
    itemsCount = 0;

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private apiService: ApiService,
        private titleService: Title,
        // private paginator: MatPaginator
    ) {
        sessionStorage.setItem('AppTitle', 'Manage Company');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage Company');
        this.getAllCompany();
        // this.dataSource.paginator = this.paginator;
    }


    private getAllCompany() {
        // const apikey = 'bIPXlfzvB1kHilurK4s@jjnOiDCoVQ';
        const apikey = localStorage.getItem("APIKey");
        this.apiService.get('GetCompanies', { 'apiKey': apikey, 'companyname': '' })
            .subscribe(res => {
                this.companyInfoList = res.data.companies.company;
            }, error => {
                console.log(error);
            });

    }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }

}
