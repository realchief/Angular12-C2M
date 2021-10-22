import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { ViewMyeventsComponent } from './pages/view-myevents/view-myevents.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'addEvent',
                component: AddEventComponent
            },
            {
                path: 'viewEvents',
                component: ViewMyeventsComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule { }
