import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from "../_guards/auth.guard";

const routes: Routes = [
    { 
        path: '', 
        canActivate: [AuthGuard],
        component: HomeComponent 
    },
    { 
        path: 'home', 
        canActivate: [AuthGuard],
        component: HomeComponent 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {
}