import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { IHeaderMap } from 'src/app/_models/plasmaGridInterface';
import { NgbDateFRParserFormatter } from 'src/app/_services/ngb-date-fr-parser-formatter';
import { AuthService } from 'src/app/_services/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'generic-grid',
  templateUrl: './generic-grid.component.html',
  providers: [{
    provide: NgbDateParserFormatter,
    useClass: NgbDateFRParserFormatter
  }],
  styleUrls: ['./generic-grid.component.scss']
})
export class GenericGridComponent {

  dateFormat: string;
  selectedAll = false;
  defaultCollaps = '';
  currentPage = 1;
  itemsPerPage: number;
  pageStatus: any = {};
  sortType: string;

  @Input() pageNum = -1;
  @Input() headerMap!: IHeaderMap;
  @Input() pageSizeOptions: number[] = [10, 20, 30, 40, 50, 100];
  @Input() sNo = false;
  GridSearchConfig: any = [];
  ConfigColumnsData!: {
    colIndex: number;
    ConditionOpt1: string;
    filterValue1: string;
    logicalOpt: string;
    ConditionOpt2: string;
    filterValue2: string;
    activefiltercolindex: number;
  };
  @Input() dataSource: any;
  @ViewChild('pageSelect') pageSelect: any;
  @Input() itemsCount: number;
  @Input() isExport: any;
  @Input() filterValue1!: string;
  @Input() filterValue2!: string;
  @Input() ConditionOpt1!: string;
  @Input() ConditionOpt2!: string;
  @Input() logicalOpt!: string;


  @Output() pageChange = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<any>();
  @Output() rowClick = new EventEmitter<any>();
  isRemoveFilter: boolean=false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    this.itemsPerPage = 0;
    this.itemsCount = 0;
    this.sortType = 'asc';
    this.dateFormat = environment.Setting.dateFormat;
  }

  get first(): number {
    if (this.pageNum > 0) {
      this.currentPage = 1;
      this.getPageStatus();
    }
    this.pageNum = -1;
    return (this.currentPage - 1) * (this.itemsPerPage > 0 ? this.itemsPerPage : this.pageSizeOptions[0]) + 1;
  }

  get last(): number {
    const l = ((this.itemsPerPage > 0 ? this.itemsPerPage : this.pageSizeOptions[0]) * this.currentPage);
    if (l > this.itemsCount) {
      return this.itemsCount;
    } else {
      return l;
    }
  }

  get TotalPage(): number {
    return Math.ceil(this.itemsCount / (this.itemsPerPage > 0 ? this.itemsPerPage : this.pageSizeOptions[0]));
  }

  get colSpan(): number {
    let length = Object.keys(this.headerMap.config.header.columns).length;
    if (this.sNo === true) {
      length = length + 1;
    }
    const cols = Object.keys(this.headerMap.config.header.action);
    if (cols.filter(x => x === 'Checkbox').length > 0) {
      length = length + 1;
    }
    if (cols.filter(x => x === 'Edit' || x === 'Delete').length > 0) {
      length = length + 1;
    }
    return length;
  }

  get actionWidth(): number {
    let wdth = 40;
    if (this.headerMap.config.header.action.Edit === true) {
      wdth = wdth + 10;
    }
    if (this.headerMap.config.header.action.Delete === true) {
      wdth = wdth + 10;
    }
    if (this.headerMap.config.header.action.Copy === true) {
      wdth = wdth + 10;
    }
    return wdth;
  }

  nextPage() {
    if (this.currentPage < this.TotalPage) {
      this.currentPage = this.currentPage + 1;
    } else {
      this.currentPage = 1;
    }
    this.pageChange.emit(this.getPageStatus());
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    } else {
      this.currentPage = this.TotalPage;
    }
    this.pageChange.emit(this.getPageStatus());
  }

  pageChangeClick(item: number) {
    this.itemsPerPage = item;
    this.currentPage = 1;
    this.pageChange.emit(this.getPageStatus());
  }
 
  

  goToPage(val: string) {
    const selectedPage = +val;
    if (selectedPage <= this.TotalPage) {
      if (selectedPage < 1) {
        this.pageSelect.nativeElement.value = 1;
        this.toastr.warning('Value must be greater than or equal to 1.');
      } else {
        this.currentPage = selectedPage;
      }
      this.pageChange.emit(this.getPageStatus());
    }
  }

  private getPageStatus(): any {
    this.pageStatus.pageSize = (this.itemsPerPage > 0 ? this.itemsPerPage : this.pageSizeOptions[0]);
    this.pageStatus.currentPage = this.currentPage;
    return this.pageStatus;
  }

  onRowClick(rowind: number, data: any) {
    data.index = rowind;
    this.rowClick.emit(data);
  }

  onAction(index: number, act: string, columnFilter?: any) {
    const data = {
      rowIndex: index,
      action: act,
      ColumnFilterDropdown: columnFilter
    };
    this.actionClick.emit(data);
  }

  onLinkAction(rowIndex: number, objectKey: string) {
    const data = {
      rowIndex,
      action: 'Link',
      objectKey
    };
    this.actionClick.emit(data);
  }

  onSwitchAction(rowIndex: number, objectKey: boolean) {
    const data = {
      rowIndex,
      action: 'switchButton',
      objectKey
    };
    this.actionClick.emit(data);
  }

  getDeviceStatus(data: any) {
    if (data.DeviceStatus === 'Active' || data.Status === 'On') {
      return true;
    } else {
      return false;
    }
  }


  bindColumnFilterDdl(colInd: number, frmVal: any) {
    //For reset Filter Form
    if(this.isRemoveFilter === true){
     frmVal.reset();
   }else{        
   frmVal.submitted = false;
   }
   const data = {
     colIndex: colInd,
     action: 'Filter_Header',
     colData: this.headerMap.config.header.columns[colInd],
     ConditionOpt1: '',
     ConditionOpt2: ''
   };

   // check sesson storage
   if (sessionStorage.getItem('storage_GridSearchConfig')) {
     this.GridSearchConfig = JSON.parse(sessionStorage.getItem('storage_GridSearchConfig')|| "null");
   }

   if (this.GridSearchConfig.filter((d: { colIndex: number; }) => d.colIndex === colInd).length > 0) {
     const index = this.GridSearchConfig.map((item: { colIndex: any; }) => item.colIndex).indexOf(colInd);
     this.ConfigColumnsData = this.GridSearchConfig[index];
     frmVal.ConditionOpt1.value = frmVal.ConditionOpt1.value === '' ? this.ConfigColumnsData.ConditionOpt1 : frmVal.ConditionOpt1.value;
     frmVal.ConditionOpt2.value = frmVal.ConditionOpt2.value === '' ? this.ConfigColumnsData.ConditionOpt2 : frmVal.ConditionOpt2.value;
     frmVal.logicalOpt.value = frmVal.logicalOpt.value === '' ? this.ConfigColumnsData.logicalOpt : frmVal.logicalOpt.value;
     frmVal.filterValue1.value = frmVal.filterValue1.value === '' ? this.ConfigColumnsData.filterValue1 : frmVal.filterValue1.value;
     frmVal.filterValue2.value = frmVal.filterValue2.value === '' ? this.ConfigColumnsData.filterValue2 : frmVal.filterValue2.value;

     this.ConfigColumnsData = {
       colIndex: colInd,
       ConditionOpt1: frmVal.ConditionOpt1.value,
       filterValue1: frmVal.filterValue1.value,
       logicalOpt: frmVal.logicalOpt.value,
       ConditionOpt2: frmVal.ConditionOpt2.value,
       filterValue2: frmVal.filterValue2.value,
       activefiltercolindex: -1
     };

     this.GridSearchConfig[index] = this.ConfigColumnsData;
   } else {
     if (data.colData.dataType === 'Date' || data.colData.dataType === 'Currency') {
       frmVal.ConditionOpt1.value = 'GREATER_THAN';
       frmVal.ConditionOpt2.value = 'GREATER_THAN';
     } else {
       frmVal.ConditionOpt1.value = 'CONTAINS';
       frmVal.ConditionOpt2.value = 'CONTAINS';
     }

     frmVal.filterValue1.value = '';
     frmVal.filterValue2.value = '';

     this.ConfigColumnsData = {
       colIndex: colInd,
       ConditionOpt1 : frmVal.ConditionOpt1.value,
       filterValue1: frmVal.filterValue1.value,
       logicalOpt: frmVal.logicalOpt.value,
       ConditionOpt2: frmVal.ConditionOpt2.value,
       filterValue2: frmVal.filterValue2.value,
       activefiltercolindex: -1
     };

     this.GridSearchConfig.push(this.ConfigColumnsData);
   }

   this.actionClick.emit(data);
 }
  
  OnRemoveFilterClick() {
    this.GridSearchConfig = [];  
    if( sessionStorage.getItem("storage_GridSearchConfig")){
      sessionStorage.removeItem("storage_GridSearchConfig");
      this.isRemoveFilter=true;
    }
  }

  onFilterClick(colInd: number, frmVal: any, actiontype: string, ColumnFilter: any) {
    const data = {
      colIndex: colInd,
      action: actiontype,
      colData: this.headerMap.config.header.columns[colInd],
      filterData: {
        filterValue1: '',
        filterValue2: '',
        ConditionOpt1: {},
        ConditionOpt2: {},
        logicalOpt: {},
      },
      ColumnFilterDropdown: ColumnFilter
    };

    if (this.headerMap.config.header.columns[colInd].Filed === 'Checkbox') {
      const SelectedRecordIds: Array<string> = [];
      for (const chkbox of frmVal.filterValue1) {
        if (chkbox.checked === true) {
          SelectedRecordIds.push(chkbox.value);
        }
      }
      data.filterData.filterValue1 = SelectedRecordIds.join(',');
    } else {
      if (frmVal.filterValue1 && frmVal.filterValue1.value !== '') {
        let val1 = frmVal.filterValue1.value;
        if (this.headerMap.config.header.columns[colInd].dataType === 'Date') {
          val1 = this.convertToSystemDataAndTime(val1, 'yyyy-MM-dd HH:mm:ss', 0, frmVal.ConditionOpt1.value);
        }
        data.filterData.filterValue1 = val1;
      }

      if (frmVal.filterValue2 && frmVal.filterValue2.value !== '') {
        let val2 = frmVal.filterValue2.value;
        if (this.headerMap.config.header.columns[colInd].dataType === 'Date') {
          val2 = this.convertToSystemDataAndTime(val2, 'yyyy-MM-dd HH:mm:ss', 0, frmVal.ConditionOpt2.value);
        }
        data.filterData.filterValue2 = val2;
      }

      data.filterData.ConditionOpt1 = {
        Text: frmVal.ConditionOpt1.selectedOptions[0] ? frmVal.ConditionOpt1.selectedOptions[0].innerText : '',
        Value: frmVal.ConditionOpt1.value
      };
      data.filterData.ConditionOpt2 = {
        Text: frmVal.ConditionOpt2.selectedOptions[0] ? frmVal.ConditionOpt2.selectedOptions[0].innerText : '',
        Value: frmVal.ConditionOpt2.value
      };
      data.filterData.logicalOpt = {
        Text: frmVal.logicalOpt.selectedOptions[0] ? frmVal.logicalOpt.selectedOptions[0].innerText : '',
        Value: frmVal.logicalOpt.value
      };
    }

    if (actiontype === 'FilterClear_Click') {
      frmVal.filterValue1.value = '';
      frmVal.filterValue2.value = '';
      frmVal.ConditionOpt2.value = '';
      frmVal.ConditionOpt1.value = '';
      frmVal.logicalOpt.value = '';
    }
    this.SetGridSearchConfig(colInd, frmVal, data.colData.dataType);

    if (this.validate(data)) {
      this.currentPage = 1;
      this.getPageStatus();
      sessionStorage.setItem('storage_GridSearchConfig', JSON.stringify(this.GridSearchConfig));
      this.actionClick.emit(data);
    }
  }

  SetGridSearchConfig(colInd: number, frmVal: any, dataType:any) {
    if (dataType === 'Date' || dataType === 'Currency') {
      frmVal.ConditionOpt1.value = frmVal.ConditionOpt1.value === '' ? 'GREATER_THAN' : frmVal.ConditionOpt1.value;
      frmVal.ConditionOpt2.value = frmVal.ConditionOpt2.value === '' ? 'GREATER_THAN' : frmVal.ConditionOpt2.value;
    } else {
      frmVal.ConditionOpt1.value = frmVal.ConditionOpt1.value === '' ? 'CONTAINS' : frmVal.ConditionOpt1.value;
      frmVal.ConditionOpt2.value = frmVal.ConditionOpt2.value === '' ? 'CONTAINS' : frmVal.ConditionOpt2.value;
    }

    this.ConfigColumnsData = {
      colIndex: colInd,
      ConditionOpt1 : frmVal.ConditionOpt1.value,
      filterValue1: frmVal.filterValue1.value,
      logicalOpt: frmVal.logicalOpt.value,
      ConditionOpt2: frmVal.ConditionOpt2.value,
      filterValue2: frmVal.filterValue2.value,
      activefiltercolindex: -1
    };

    if (this.GridSearchConfig.filter((d: { colIndex: number; }) => d.colIndex === colInd).length > 0) {
      const index = this.GridSearchConfig.map((item: { colIndex: any; }) => item.colIndex).indexOf(colInd);
      this.GridSearchConfig[index] = this.ConfigColumnsData;
    } else {
      this.GridSearchConfig.push(this.ConfigColumnsData);
    }
  }

  selectAllCheckBox() {
    if (this.selectedAll) {
      for (const i of this.dataSource) {
        i.selected = true;
      }
    } else {
      for (const i of this.dataSource) {
        i.selected = false;
      }
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.dataSource.every((chkItem: any) => chkItem.selected === true);
  }

  public getColorName(key: any, index: number): string {
    if (key.Color) {
      if (key.CompareWith) {
        if (key.Condition === 'equal') {
          if (key.CompareWith === this.dataSource[index][key.objectKey]) {
            return key.Color;
          }
        } else if (key.Condition === 'notEqual') {
          if (key.CompareWith !== this.dataSource[index][key.objectKey]) {
            return key.Color;
          }
        } else if (key.Condition === 'contains') {
          if (this.dataSource[index][key.objectKey].includes(key.CompareWith)) {
            return key.Color;
          }
        }
      } else if (key.CompareColumn) {
        if (key.Condition === 'equal') {
          if (this.dataSource[index][key.CompareColumn] === key.CompareValue) {
            return key.Color;
          }
        } else if (key.Condition === 'notEqual') {
          if (this.dataSource[index][key.CompareColumn] !== key.CompareValue) {
            return key.Color;
          }
        }
      } else {
        return key.Color;
      }
    }
    return '';
  }

  public textSeprator(data: string, separator: string) {
    if (data) {
      const ar = data.split(separator);
      if (ar.length > 1) {
        return ar[0] + ',...';
      }
      return data;
    }
    return '';
  }

  public textSepratorHover(data: string, separator: string) {
    if (data) {
      const ar = data.split(separator);
      if (ar.length > 1) {
        return ar.join('<br>');
      }
      return data;
    }
    return '';
  }

  sort(index: number, type: string, ColumnFilter?: any) {
    let data = {};
    data = {
      colIndex: index,
      action: type,
      colData: this.headerMap.config.header.columns[index],
      ColumnFilterDropdown: ColumnFilter
    };
    this.sortType = type === 'asc' ? 'desc' : 'asc';
    this.actionClick.emit(data);
  }

  validate(event: any): boolean {
    if (event.filterData.ConditionOpt1 && (event.filterData.ConditionOpt1.Value === '' || event.filterData.ConditionOpt1.Value === 'Select...')) {
      return false;
    } else if (event.filterData.filterValue1 === '' || event.filterData.filterValue1 == null) {
      return false;
    } else {
      return true;
    }
  }

  convertToLocalDataAndTime(value: any, format: string, zone: number) {
    try {
      if (value !== '') {
        const d = new Date(value); // val is in UTC
        const localOffset = zone * 60000;
        const localTime = d.getTime() - localOffset;
        d.setTime(localTime);
        return formatDate(d, format, 'en-US');
      }
      return '';
    } catch (error) {
      console.log('Datevalue-' + value + 'error' + error);
      return '';
    }
  }

  convertToLocalDataAndTimeddmmtodd(value: any, format: string, zone: number) {
    try {
      if (value !== '') {
        value = value.split('/');
        const nDate = value[1] + '/' + value[0] + '/' + value[2];
        const d = new Date(nDate); // val is in UTC
        const localOffset = zone * 60000;
        const localTime = d.getTime() - localOffset;
        d.setTime(localTime);
        return formatDate(d, format, 'en-US');
      }
      return '';
    } catch (error) {
      console.log('Datevalue-' + value + 'error' + error);
      return '';
    }
  }

  convertToSystemDataAndTime(value: any, format: string, zone: number, ConditionOption: string) {
    if (value == null || value === '') {
      return null;
    }
    try {
      let modifiedDateValue;
      const dateArray = value.split('/');
      if (environment.Setting.dateFormat === 'dd/MM/yyyy') {
        modifiedDateValue = dateArray[1].toString() + '/' + dateArray[0].toString() + '/' + dateArray[2].toString();
      } else {
        modifiedDateValue = dateArray[0].toString() + '/' + dateArray[1].toString() + '/' + dateArray[2].toString();
      }
      let timeZone: number;
      if (!zone) {
        timeZone = this.authService.currentUserValue?.TimeZone as number;
      } else {
        timeZone = zone;
      }
      const d = new Date(modifiedDateValue); // val is in UTC
      const localOffset = timeZone * 60000;

      if (['GREATER_THAN', 'LESS_THAN_OR_EQUAL'].indexOf(ConditionOption) > -1) {
        d.setHours(23, 59, 59, 999);
      } else {
        d.setHours(0, 0, 0, 0);
      }

      const localTime = d.getTime() + localOffset;
      d.setTime(localTime);
      return formatDate(d, format, 'en-US');
    } catch (error) {
      console.log('Datevalue-' + value + 'error' + error);
      return '';
    }
  }

  getLocalDateTime(dtStr: string) {
    let nDate = null;
    if (dtStr === '') {
      return '';
    } else {
      nDate = dtStr.split('/');
      nDate = nDate[1] + '/' + nDate[0] + '/' + nDate[2];
      const offset = new Date().getTimezoneOffset();
      const dt = new Date(nDate);
      const diff = -(offset);
      const newDateObj = new Date(dt.getTime() + (diff * 60000));
      return newDateObj.toLocaleString('en-US');
    }
  }

}
