import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../_services/auth.service";
import { TokenStorageService } from "../_services/token-storage.service";
import { environment } from 'src/environments/environment';


@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: './templates/login.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class AuthComponent implements OnInit {

    form: any = {
        username: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];

    constructor(
        private router: Router,
        private authService: AuthService, 
        private tokenStorage: TokenStorageService
    ){}

    ngOnInit(): void {
        if (localStorage.getItem('APIKey')) {
            this.isLoginFailed = true;
        }
    }

    onSubmit(): void {
        const { username, password } = this.form;
        this.authService.login(username, password).subscribe(
            data => {
                console.log(data.status);
                if (data.status == 'SUCCESS') {
                    localStorage.setItem('Email', username);
                    localStorage.setItem('AccessToken', data.data.Tokens.AccessToken);
                    this.isLoginFailed = false;
                    this.isLoggedIn = true;
                    this.router.navigate(['']);  
                } else {                    
                    this.errorMessage = data.message;
                    this.isLoginFailed = true;
                    // this.reloadPage();
                }
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }
    
    reloadPage(): void {
        window.location.reload();
    }

}