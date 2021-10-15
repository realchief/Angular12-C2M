import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.Setting.BaseAPIUrl;

  constructor(private http: HttpClient) {
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) {
      this.http.post(this.endpoint + 'GetAccessToken', { 
        UserName: environment.Setting.USERNAME,
        Password: environment.Setting.PASSWORD,
        AppKey: environment.Setting.PASSWORD,
        AppSecret: environment.Setting.AppSecret,
      }, httpOptions).subscribe(
        data => {
          console.log(data);
        }
      )
    }
   }

  login(username: string, password: string): Observable<any> {
    const accessToken = localStorage.getItem('AccessToken');    
    return this.http.post(this.endpoint + 'UserLogin', {
      EmailAddress: username,
      Password: password,
      AccessToken: accessToken
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
    var AccessToken = "test";
    return this.http.post(this.endpoint + 'SignUpUser', {
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
