import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from "../_services/auth.service";

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/forgotpassword.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ForgotPasswordComponent implements OnInit {
    submitted = false;
    form: any = {
        email: null
    };
    isSendingFailed = true;
    accessToken = '';
    errorMessage = '';
    successMessage = '';


    constructor(
        private router: Router,
        private authService: AuthService
        // private _script: ScriptLoaderService,
        // private _userService: UserService,
        // private _route: ActivatedRoute,
        // private _authService: AuthenticationService,
        // private _alertService: AlertService,
        // private cfr: ComponentFactoryResolver
    ) {
        
    }

    ngOnInit() { 
        
    }

    onSubmit() {
        const { email } = this.form;
        this.authService.forgotpassword(email).subscribe(
            data => {
                console.log(data.status);
                if (data.status == 'SUCCESS') {
                    this.successMessage = data.message;
                    this.isSendingFailed = false;
                } else {                    
                    this.errorMessage = data.message;
                    this.isSendingFailed = true;
                }
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
}