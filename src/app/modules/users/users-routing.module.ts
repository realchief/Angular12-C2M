import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { ManageUsersGridComponent } from './pages/manageusers-grid/manageusers-grid.component';
import { ManageUsersAddComponent } from './pages/manageusers-add/manageusers-add.component';


const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: ManageUsersGridComponent,
  },
  {
    path: 'add',
    canActivateChild: [AuthGuard],
    component: ManageUsersAddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
