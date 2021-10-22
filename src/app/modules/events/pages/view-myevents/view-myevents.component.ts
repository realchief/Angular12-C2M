import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/_services/api.service';

@Component({
    selector: 'app-view-myevents',
    templateUrl: './view-myevents.component.html'
})
export class ViewMyeventsComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;

    constructor(
        private router: Router,
        private titleService: Title,
        private apiService: ApiService,
    ) {
        sessionStorage.setItem('AppTitle', 'Events');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage Company');
        this.getAllEvents();
    }

    private getAllEvents() {
        this.apiService.getWithApiKey('v1/events', { 'is_system_generated': 'true', 'limit': '1', 'offset': '1' })
            .subscribe(res => {
                console.log(res.data.Events);
                if (Array.isArray(res.data.Events.EventMain)) {
                    this.dataSource = res.data.Events.EventMain;
                  } else if (!res.data.Events.EventMain) {
                    this.dataSource = [];
                  } else {
                    this.dataSource = [res.data.Events.EventMain];
                  }
            }, error => {
                console.log(error);
            });

    }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }
}
