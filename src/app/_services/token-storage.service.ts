import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    endpoint = environment.Setting.BaseAPIUrl;
    constructor(
        private http: HttpClient,
        private api: ApiService
    ) {
    }

    store_token(username: string, password: string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        const payload = {
            "UserName":username,
            "Password":password,
            "AppKey": environment.Setting.AppKey,
            "AppSecret": environment.Setting.AppSecret
        }
        return this.http.post(this.endpoint + '/GetAccessToken', payload, httpOptions)
    }
    
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