import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { UsersGridComponent } from './pages/manageusers-grid/manageusers-grid.component';

const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: UsersGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
