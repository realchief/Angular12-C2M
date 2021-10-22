import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RoleGridComponent } from './role-grid/role-grid.component';
import { RoleManagementRoutingModule } from './role-management-routing.module'

@NgModule({
  declarations: [
    RoleGridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoleManagementRoutingModule
  ]
})
export class RoleManagementModule { }
