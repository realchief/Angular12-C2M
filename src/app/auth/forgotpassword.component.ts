import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/forgotpassword.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ForgotPasswordComponent implements OnInit {
    // model: any = {};
    // @ViewChild('alertSignin',
    //     { read: ViewContainerRef }) alertSignin: ViewContainerRef;

    constructor(
        private _router: Router,
        // private _script: ScriptLoaderService,
        // private _userService: UserService,
        // private _route: ActivatedRoute,
        // private _authService: AuthenticationService,
        // private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() { }

}