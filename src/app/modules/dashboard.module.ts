import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from "./dashboard.component";

import { DashboardRoutingModule } from './dashboard-routing.module';

import { AsideNavComponent } from '../layouts/aside-nav/aside-nav.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { HeaderNavComponent } from '../layouts/header-nav/header-nav.component';
import { MenuRightComponent } from '../layouts/menu-right/menu-right.component';
import { ScrollTopComponent } from '../layouts/scroll-top/scroll-top.component';

import { HomeComponent } from './home/home.component';
import { AppAddComponent } from './home/app-add/app-add.component';
import { AppGridComponent } from './home/app-grid/app-grid.component';

import { FilterPipe } from '../_pipes/filter.pipe'; 
import { HighlightDirective } from '../_directives/highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    DashboardComponent,
    AsideNavComponent,
    FooterComponent,
    HeaderNavComponent,
    MenuRightComponent,
    ScrollTopComponent,
    HomeComponent,
    AppAddComponent,
    AppGridComponent,
    FilterPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ],
  exports: [
    HomeComponent,
    AppAddComponent
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
