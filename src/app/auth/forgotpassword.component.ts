import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
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
    isSendingFailed = false;
    accessToken = '';
    errorMessage = '';
    successMessage = '';


    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    ngOnInit() {

    }

    onSubmit() {
        const { email } = this.form;

        this.authService.storeToken(environment.Setting.ADMIN_USERNAME, environment.Setting.ADMIN_USER_PASSWORD).subscribe(data => {
            const cdata: any = data
            localStorage.setItem('AccessToken', cdata.data.Tokens.AccessToken);

            this.authService.forgotpassword(email).subscribe(
                data => {
                    console.log(data.status);
                    if (data.status == 'SUCCESS') {
                        this.successMessage = data.message;
                        this.isSendingFailed = false;
                        this.router.navigate(['/resetpassword']);
                    } else {
                        this.errorMessage = data.message;
                        this.isSendingFailed = true;
                    }
                },
                err => {
                    this.errorMessage = err.error.message;
                }
            );
        });
    }
}