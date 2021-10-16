import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    endpoint = environment.Setting.BaseAPIUrl;

    constructor(
        private http: HttpClient
    ) {

    }

    getPublicContent(): Observable<any> {
        return this.http.get(this.endpoint + 'all', { responseType: 'text' });
    }

    getUserBoard(): Observable<any> {
        return this.http.get(this.endpoint + 'user', { responseType: 'text' });
    }

    getModeratorBoard(): Observable<any> {
        return this.http.get(this.endpoint + 'mod', { responseType: 'text' });
    }

    getAdminBoard(): Observable<any> {
        return this.http.get(this.endpoint + 'admin', { responseType: 'text' });
    }
}