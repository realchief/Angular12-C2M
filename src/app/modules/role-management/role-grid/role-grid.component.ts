import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-role-grid',
    templateUrl: './role-grid.component.html'
})
export class RoleGridComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private apiService: ApiService,
        private titleService: Title
    ) {
        sessionStorage.setItem('AppTitle', 'Manage Role');
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage Role');
        this.getAllRole();
    }


    private getAllRole() {
        const accessToken = localStorage.getItem("AccessToken");
        const payload =
        {
            "Userid": "565",
            "PolicyBundleId": "1",
            "AccessToken": accessToken
        }

        this.apiService.postWithOutHeader('GetRoleList', payload)
            .subscribe(res => {
                console.log(res);
                this.dataSource = res.data.UserRoleInfo.PolicyInfo;
            }, error => {
                console.log(error);
            });
    }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }

}
