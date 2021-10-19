import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
// import { Helpers } from '../../../helpers';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit {

    ishidden = false;
    constructor() {

    }
    ngOnInit() {
        
    }

    show(): void{
        this.ishidden = !this.ishidden;
    }
}