import { Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from "../_services/auth.service";

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/resetpassword.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ResetPasswordComponent implements OnInit {
    submitted = false;
    form: any = {
        email: null,
        code: null,
        password: null,
        confirm_password: null
    };
    isSuccessful = false;
    isMatched = true;
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

        const { code, email, password, confirm_password } = this.form;

        if (password != confirm_password) {
            this.isMatched = false;
        } else {
            this.isMatched = true;
        }

        this.authService.storeToken().subscribe(data => {
            const cdata: any = data
            localStorage.setItem('AccessToken', cdata.data.Tokens.AccessToken);

            this.authService.resetpassword(code, email, password).subscribe(
                data => {
                    console.log(data.status);
                    if (data.status == 'SUCCESS') {
                        this.successMessage = data.message;
                        this.isSuccessful = true;
                        this.router.navigate(['/login']);
                    } else {                    
                        this.errorMessage = data.message;
                        this.isSuccessful = false;
                    }
                },
                err => {
                    this.errorMessage = err.error.message;
                }
            );
        });
        
    }
}