import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';

import { InterfaceRoutingModule } from './interface-management-routing.module'

@NgModule({
  declarations: [
    InterfaceGridComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InterfaceRoutingModule
  ]
})
export class InterfaceManagementModule { }
