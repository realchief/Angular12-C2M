import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
