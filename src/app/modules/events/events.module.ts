import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { ViewEventsGridComponent } from './pages/view-events-grid/view-events-grid.component';
import { ViewMyeventsComponent } from './pages/view-myevents/view-myevents.component';


@NgModule({
  declarations: [
    AddEventComponent,   
    ViewEventsGridComponent,
    ViewMyeventsComponent
  ],
  imports: [
    CommonModule,   
    EventsRoutingModule 
  ],
  exports: [
    ViewEventsGridComponent,
    ViewMyeventsComponent
  ]
})
export class EventsModule { }
