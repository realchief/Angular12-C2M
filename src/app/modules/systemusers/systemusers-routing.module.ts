import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { SystemUsersGridComponent } from './pages/systemusers-grid/systemusers-grid.component';
import { SystemUsersAddComponent } from './pages/systemusers-add/systemusers-add.component';


const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: SystemUsersGridComponent,
  },
  {
    path: 'add',
    canActivateChild: [AuthGuard],
    component: SystemUsersAddComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUsersRoutingModule { }
