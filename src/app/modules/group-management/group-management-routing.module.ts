import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { GroupGridComponent } from './group-grid/group-grid.component';
import { GroupAddComponent } from './group-add/group-add.component';
const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: GroupGridComponent
  },
  {
    path: 'add',
    canActivateChild: [AuthGuard],
    component: GroupAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManagementRoutingModule { }
