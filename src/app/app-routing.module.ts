import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./_guards/auth.guard";
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { 
    path: 'login', component: AuthComponent 
  },
  { 
    path: 'signup', component: SignUpComponent 
  },
  { 
    path: '', 
    canActivate: [AuthGuard],
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
