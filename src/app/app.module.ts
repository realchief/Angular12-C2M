import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './signup/signup.module';
import { DashboardModule } from './modules/dashboard.module';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        SignUpModule,
        HttpClientModule,
        DashboardModule,
        NgbModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule
    ],
    providers: [
        authInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
