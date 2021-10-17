import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";

declare let $: any;
declare let mUtil: any;

@Component({
    selector: ".m-grid.m-grid--hor.m-grid--root.m-page",
    templateUrl: "./signup.component.html",
    encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {
    
    form: any = {
        username: null,
        email: null,
        password: null,
        confirm_password: null,
        signup_terms: null
    };
    isMatched = true;
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
    }

    onSubmit(): void {

        const { username, email, password, confirm_password } = this.form;

        if (password != confirm_password) {
            this.isMatched = false;
        } else {
            this.isMatched = true;
        }

        this.authService.register(username, email, password).subscribe(
            data => {
                
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }
}
