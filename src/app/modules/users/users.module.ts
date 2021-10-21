import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageUsersGridComponent } from './pages/manageusers-grid/manageusers-grid.component';
import { ManageUsersAddComponent } from './pages/manageusers-add/manageusers-add.component';

import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [
    ManageUsersGridComponent,
    ManageUsersAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
