import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-events-grid',
  templateUrl: './view-events-grid.component.html'
})

export class ViewEventsGridComponent implements OnInit {

  filters: any = {};
  itemsCount = 0;
  logicalOpt = 'OR';
  pageNum = -1;
  filterValue1 = '';
  filterValue2 = '';
  ConditionOpt1 = '';
  ConditionOpt2 = '';
  SearchText = new FormControl('');
  dataSource: any = {};

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {
    sessionStorage.setItem('AppTitle', 'Event Management');
   }

  bodyData: any = {
    pageSize: 10,
    pageNumber: 1,
    sortColumn: '',
    sortOrder: 'desc',
    timeZone: 0,
    gridFilters: []
  };


  ngOnInit(): void {
  }

  ngOnDestroy() {
    sessionStorage.removeItem('AppTitle');
  }

}
