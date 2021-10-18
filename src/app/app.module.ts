import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from './signup/signup.module';
import { AsideNavComponent } from './layouts/aside-nav/aside-nav.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderNavComponent } from './layouts/header-nav/header-nav.component';
import { MenuRightComponent } from './layouts/menu-right/menu-right.component';
import { ScrollTopComponent } from './layouts/scroll-top/scroll-top.component';

import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';


@NgModule({
  declarations: [
      AppComponent,
      AsideNavComponent,
      FooterComponent,
      HeaderNavComponent,
      MenuRightComponent,
      ScrollTopComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      AuthModule,
      SignUpModule,
      HttpClientModule,    
  ],
  providers: [
      authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
