import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://cloud-staging-icewebapi.c2m.net/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(API + 'UserLogin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    var UserName = username;
    var EmailAddress = email;    
    var FirstName = "Rohit";
    var MiddleName = "";
    var LastName = "Roy";
    var PhoneNumber = "+915566544433";
    var PolicyBundleId = "11";
    var GroupId = "1464";
    var RoleIDs = "357,93,365,356";
    var AccessToken = "8xYYItfGJ8F9ioWJahK3Y9wmqaLfH1jnjitBjgcGSetiOtV1m9OyehpTG0oopnkvUixIVcpgFxU=";
    return this.http.post(API + 'SignUpUser', {
        UserName,
        EmailAddress,
        FirstName,
        MiddleName,
        LastName,
        PhoneNumber,
        PolicyBundleId,
        GroupId,
        RoleIDs,
        AccessToken
    }, httpOptions);
  }
}
