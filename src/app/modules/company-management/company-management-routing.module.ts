import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "../../_guards/auth.guard";

import { CompanyGridComponent } from './company-grid/company-grid.component';

const routes: Routes = [
  
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: CompanyGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyManagementRoutingModule { }
