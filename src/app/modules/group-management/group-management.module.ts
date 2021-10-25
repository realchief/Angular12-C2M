import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GroupGridComponent } from './group-grid/group-grid.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupManagementRoutingModule } from './group-management-routing.module'

@NgModule({
  declarations: [
    GroupGridComponent,
    GroupAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupManagementRoutingModule
  ]
})
export class GroupManagementModule { }
