import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit{

    ishidden = false;
    userdropdown_hidden = false;

    constructor() {

    }
    ngOnInit() {

    }

    show(): void{
        this.ishidden = !this.ishidden;
    }

    userdropdown_show(): void{
        this.userdropdown_hidden = !this.userdropdown_hidden;
    }
}