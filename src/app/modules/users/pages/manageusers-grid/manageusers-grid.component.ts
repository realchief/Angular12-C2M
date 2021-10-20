import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHeaderMap } from 'src/app/_models/plasmaGridInterface';
import { environment } from 'src/environments/environment';
import { DatePipe, formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';


@Component({
    selector: 'app-users-grid',
    templateUrl: './manageusers-grid.component.html'
})
export class ManageUsersGridComponent implements OnInit {


    encrypted: any;
    transactionId: string | undefined;
    filters: any = {};
    dataSource: any;
    ExportData: any;
    itemsCount = 0;
    pageNum = -1;
    dammyData: any = {};
    filterValue1 = '';
    filterValue2 = '';
    ConditionOpt1 = '';
    ConditionOpt2 = '';
    logicalOpt = 'OR';
    TimeZone: string | undefined;
    dateFormat = '';

    bodyData: any = {
        PageSize: 10,
        PageNumber: 1,
        SortColumn: 'FirstName',
        SortOrder: 'desc',
        TimeZone: 0,
        GridFilters: [],
        SearchName: ''
    };

    HeaderMap: IHeaderMap = {
        config: {
          header: {
            columns: [
              {
                objectKey: 'UserName',
                displayName: 'User Name',
                width: '15%'
              },
              {
                objectKey: 'FirstName',
                displayName: 'First Name',
                width: '15%'
              },
              {
                objectKey: 'LastName',
                displayName: 'Last Name',
                width: '15%'
              },
              {
                objectKey: 'EmailAddress',
                displayName: 'Email Address',
                width: '15%'
              },
              {
                objectKey: 'Phone',
                displayName: 'Phone',
                width: '15%'
              },
              {
                objectKey: 'Status',
                displayName: 'Status',
                width: '8%'
              },
              {
                objectKey: 'UserType',
                displayName: 'User Type',
                width: '12%'
              },
              {
                objectKey: 'DateRegistered',
                displayName: 'Created On',
                dataType: 'Date',
                format: environment.Setting.dateUsFormat, // 'MM/dd/yyyy',
                timeZone: this.authService.currentUserValue?.TimeZone.toString(),
                width: '10%'
              },
              {
                objectKey: 'DateLastModified',
                displayName: 'Modified On',
                dataType: 'Date',
                format: environment.Setting.dateUsFormat, // 'MM/dd/yyyy',
                timeZone: this.authService.currentUserValue?.TimeZone.toString(),
                width: '10%'
              },
            ],
            action: {
              Edit: true,
              Delete: true,
              Checkbox: true,
              Placement: 'IsExternalShow',
              DropDown: false
            },
            columnFilter: []
          },
          paging: true
        }
      };

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private authService: AuthService,
        private apiService: ApiService,
    ) {
    }

    ngOnInit() {
    }

    private bindUser(bodyData: any) {
        this.apiService.post('GetAllManageUserList',bodyData)
        .subscribe(res => {
          this.dataSource = res.Data;
          this.itemsCount = res.RecordsCount;
        }, error => {
           console.log(error);
        });
    
    }

    pageChange(event: any) {
        this.bodyData.PageNumber = event.currentPage;
        this.bodyData.PageSize = event.pageSize;
        this.bindUser(this.bodyData);
    }
   
}
