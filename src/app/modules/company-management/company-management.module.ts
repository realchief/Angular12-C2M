import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyGridComponent } from './company-grid/company-grid.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyManagementRoutingModule } from './company-management-routing.module'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    CompanyGridComponent,
    CompanyAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyManagementRoutingModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class CompanyManagementModule { }
