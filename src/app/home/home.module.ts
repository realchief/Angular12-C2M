import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { HomeRoutingModule } from "./home-routing.routing";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, FormsModule, HomeRoutingModule],
    providers: [],
    entryComponents: []
})
export class HomeModule {}
