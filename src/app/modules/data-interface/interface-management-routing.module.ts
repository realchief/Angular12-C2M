import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';
import { ChannelAddComponent } from './channel-add/channel-add.component';
import { APIChannelAddComponent } from './api-channel-add/api-channel-add.component';
import { FileChannelAddComponent } from './file-channel-add/file-channel-add.component';
import { DeviceChannelAddComponent } from './device-channel-add/device-channel-add.component';

const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: InterfaceGridComponent
  },
  {
    path: 'C2M-DI-MarketPlace',
    canActivateChild: [AuthGuard],
    component: InterfaceGridComponent
  },
  {
    path: 'C2M-DI-MarketPlace/Microsoft',
    canActivateChild: [AuthGuard],
    component: InterfaceGridComponent
  },
  {
    path: 'C2M-DI-MarketPlace/Microsoft/add-db-channel',
    canActivateChild: [AuthGuard],
    component: ChannelAddComponent
  },
  {
    path: 'C2M-DI-MarketPlace/Microsoft/add-api-channel',
    canActivateChild: [AuthGuard],
    component: APIChannelAddComponent
  },
  {
    path: 'C2M-DI-MarketPlace/Microsoft/add-file-channel',
    canActivateChild: [AuthGuard],
    component: FileChannelAddComponent
  },
  {
    path: 'C2M-DI-MarketPlace/Microsoft/add-device-channel',
    canActivateChild: [AuthGuard],
    component: DeviceChannelAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfaceRoutingModule { }
