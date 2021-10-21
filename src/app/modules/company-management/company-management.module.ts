import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyGridComponent } from './company-grid/company-grid.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyManagementRoutingModule } from './company-management-routing.module'

@NgModule({
  declarations: [
    CompanyGridComponent,
    CompanyAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyManagementRoutingModule
  ]
})
export class CompanyManagementModule { }
