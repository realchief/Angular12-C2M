import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageUsersGridComponent } from './pages/manageusers-grid/manageusers-grid.component';
import { UsersRoutingModule } from './users-routing.module'

@NgModule({
  declarations: [
    ManageUsersGridComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
