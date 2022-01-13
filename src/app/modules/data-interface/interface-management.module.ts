import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';
import { ChannelAddComponent } from './channel-add/channel-add.component';
import { APIChannelAddComponent } from './api-channel-add/api-channel-add.component';
import { AnalyticAddComponent } from './api-channel-add/analytic-management/analytic-add.component';
import { FileChannelAddComponent } from './file-channel-add/file-channel-add.component';
import { DeviceChannelAddComponent } from './device-channel-add/device-channel-add.component';
import { InterfaceRoutingModule } from './interface-management-routing.module'
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToggleButtonComponent } from './toggle-button-component';
import { TreeviewModule } from 'ngx-treeview';



@NgModule({
  declarations: [
    InterfaceGridComponent,
    ChannelAddComponent,
    APIChannelAddComponent,
    AnalyticAddComponent,
    FileChannelAddComponent,
    DeviceChannelAddComponent,
    ToggleButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InterfaceRoutingModule,
    MatTabsModule,
    MatTableModule,
    AngularEditorModule,
    TreeviewModule.forRoot() 
  ]
})
export class InterfaceManagementModule { }
