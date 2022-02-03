import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/_services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-systemusers-grid',
  templateUrl: './systemusers-grid.component.html'
})
export class SystemUsersGridComponent implements OnInit, OnDestroy {


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
    GridFilters: "",
    UserId: "1683",
    GroupId: "1145",
    AccessToken: localStorage.getItem('AccessToken')
  };
 
  constructor(
    private apiService: ApiService,
    private titleService: Title
  ) {
    this.dateFormat = environment.Setting.dateFormat;
    sessionStorage.setItem('AppTitle', 'System Users');
  }

  ngOnInit() {
    this.titleService.setTitle('ONE | System Users');
    this.bindUser(this.bodyData);
  }

  private bindUser(bodyData: any) {
    this.apiService.post('GetAllManageUserList', bodyData)
      .subscribe(res => {
        this.dataSource = res.data.UserInfo.ManageUsers;
        this.itemsCount = res.totalrecords;
        console.log(this.dataSource);
      }, error => {
        console.log(error);
      });

  }

  pageChange(event: any) {
    this.bodyData.PageNumber = event.currentPage;
    this.bodyData.PageSize = event.pageSize;
    this.bindUser(this.bodyData);
  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
  }

  ReplaceSingleQuotes(val: string) {
    return val.replace(/'/g, "''");
  }

  ReplaceDoubleQuotes(val: string) {
    return val.replace(/''/g, "'");
  }

}
