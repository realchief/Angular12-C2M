import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';
import { ChannelAddComponent } from './channel-add/channel-add.component';

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
    path: 'C2M-DI-MarketPlace/Microsoft/add-channel',
    canActivateChild: [AuthGuard],
    component: ChannelAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfaceRoutingModule { }
