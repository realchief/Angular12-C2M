import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { RoleGridComponent } from './role-grid/role-grid.component';
const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: RoleGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
