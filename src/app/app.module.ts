import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './signup/signup.module';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './theme/layouts/layout.module';
import { ThemeRoutingModule } from './theme/theme-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';


@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      AuthModule,
      SignUpModule,
      HomeModule,
      LayoutModule,
      ThemeRoutingModule,
      HttpClientModule,    
  ],
  providers: [
      authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
