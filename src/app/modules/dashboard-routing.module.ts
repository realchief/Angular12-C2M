import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from "../_guards/auth.guard";
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { 
        path: '', 
        canActivate: [AuthGuard],
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'company',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/company-management/company-management.module').then(m => m.CompanyManagementModule)
            },
            {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule)
            },
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {
}
