import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
    selector: 'app-users-grid',
    templateUrl: './manageusers-grid.component.html'
})
export class UsersGridComponent implements OnInit {


    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
    }

}
