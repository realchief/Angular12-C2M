import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './signup/signup.module';
import { DashboardModule } from './modules/dashboard.module';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';


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
    ],
    providers: [
        authInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
