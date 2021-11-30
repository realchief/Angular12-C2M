import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { InterfaceGridComponent } from './interface-grid/interface-grid.component';

const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: InterfaceGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfaceRoutingModule { }
