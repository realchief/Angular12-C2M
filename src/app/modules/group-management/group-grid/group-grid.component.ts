import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-group-grid',
    templateUrl: './group-grid.component.html'
})
export class GroupGridComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private apiService: ApiService,
        private titleService: Title
    ) {
        sessionStorage.setItem('AppTitle', 'Manage Group');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage Group');
    }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }

}
