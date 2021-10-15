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
// import { ScriptLoaderService } from "../_services/script-loader.service";
// import { Helpers } from "../helpers";

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
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
    }

    onSubmit(): void {
        const { username, email, password } = this.form;
        this.authService.register(username, email, password).subscribe(
            data => {
                console.log(data);
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
