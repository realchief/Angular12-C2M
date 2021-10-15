import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    endpoint = environment.Setting.BaseAPIUrl;
    constructor() { }

    // store_token(username: string, password: string): Observable<any> {
    //     const httpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    //     };
    //     const payload = {
    //         "UserName":username,
    //         "Password":password,
    //         "AppKey":"cxsr5nuDjC1PhvVgL5RR4IpHUDRvBx14", 
    //         "AppSecret": "C2M"
    //     }

    //     this.http.post(this.endpoint + 'GetAccessToken', { 
    //     }, httpOptions).subscribe(
    //         data => {
    //             console.log('hahaha');
    //             console.log(data);
    //             // localStorage.setItem('AccessToken', data.accessToken);
    //         }
    //     )
    
    //     return this.http.post<any>(`${this.endpoint}/${url}`, data, { headers, params });
    // }
    
    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {      

        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
        return JSON.parse(user);
        }

        return {};
    }
}