import { NgModule } from '@angular/core';

import { DashboardComponent } from "./dashboard.component";

import { DashboardRoutingModule } from './dashboard-routing.module';

import { AsideNavComponent } from '../layouts/aside-nav/aside-nav.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { HeaderNavComponent } from '../layouts/header-nav/header-nav.component';
import { MenuRightComponent } from '../layouts/menu-right/menu-right.component';
import { ScrollTopComponent } from '../layouts/scroll-top/scroll-top.component';

import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AsideNavComponent,
    FooterComponent,
    HeaderNavComponent,
    MenuRightComponent,
    ScrollTopComponent,
    HomeComponent
  ],
  imports: [
    DashboardRoutingModule,
  ],
  exports: [
    HomeComponent
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
