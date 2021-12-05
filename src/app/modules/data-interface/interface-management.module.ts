import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';
import { ChannelAddComponent } from './channel-add/channel-add.component';
import { InterfaceRoutingModule } from './interface-management-routing.module'
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    InterfaceGridComponent,
    ChannelAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InterfaceRoutingModule,
    MatTabsModule,
    AngularEditorModule
  ]
})
export class InterfaceManagementModule { }