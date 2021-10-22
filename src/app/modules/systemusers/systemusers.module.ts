import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SystemUsersGridComponent } from './pages/systemusers-grid/systemusers-grid.component';
import { SystemUsersAddComponent } from './pages/systemusers-add/systemusers-add.component';

import { SystemUsersRoutingModule } from './systemusers-routing.module'

@NgModule({
  declarations: [
    SystemUsersGridComponent,
    SystemUsersAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SystemUsersRoutingModule
  ]
})
export class SystemUsersModule { }
