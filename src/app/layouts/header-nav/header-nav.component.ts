import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit{

    ishidden = true;

    constructor() {

    }
    ngOnInit() {

    }

    show(): void{
        this.ishidden = !this.ishidden;
    }
}