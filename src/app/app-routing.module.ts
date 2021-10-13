import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // { path: 'login', component: AuthModule },
  { path: 'login', component: AuthComponent },
  // { path: 'signup', loadChildren: './signup/signup.module#SignUpModule' },
  // { path: 'logout', component: LogoutComponent },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
