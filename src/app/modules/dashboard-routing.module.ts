import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppAddComponent } from './home/app-add/app-add.component';
import { AppGridComponent } from './home/app-grid/app-grid.component';
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
                path: 'app/add',
                component: AppAddComponent
            },
            {
                path: 'app',
                component: AppGridComponent
            },
            {
                path: 'company',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/company-management/company-management.module').then(m => m.CompanyManagementModule)
            },
            {
                path: 'role',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/role-management/role-management.module').then(m => m.RoleManagementModule)
            },
            {
                path: 'users',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/users/users.module').then(m => m.UsersModule)
            },
            {
                path: 'systemusers',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/systemusers/systemusers.module').then(m => m.SystemUsersModule)
            },
            {
                path: 'events',
                canActivate: [AuthGuard],
                loadChildren: () => import('../modules/events/events.module').then(m => m.EventsModule),
                data: { breadcrumb: { label: 'Event Management', info: 'home' } }
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
