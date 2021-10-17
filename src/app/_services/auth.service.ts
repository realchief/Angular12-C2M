import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { TokenStorageService } from "../_services/token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint = environment.Setting.BaseAPIUrl;

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private tokenStorage: TokenStorageService
  ) {
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) {
      this.http.post(this.endpoint + 'GetAccessToken', {
        UserName: environment.Setting.USERNAME,
        Password: environment.Setting.PASSWORD,
        AppKey: environment.Setting.AppKey,
        AppSecret: environment.Setting.AppSecret,
      }, httpOptions).subscribe(
        data => {
          const cdata: any = data
          localStorage.setItem('AccessToken', cdata.data.Tokens.AccessToken);
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

  storeToken(): Observable<any> {
    return this.tokenStorage.store_token(environment.Setting.ADMIN_USERNAME, environment.Setting.ADMIN_USER_PASSWORD)
  }

  forgotpassword(email: string): Observable<any> {
    let accessToken: any = localStorage.getItem('AccessToken');
    return this.http.post(this.endpoint + 'SendCodeForResetPassword', {
      EmailAddress: email,
      AccessToken: accessToken,
      FromEmail: environment.Setting.FromEmail,
    }, httpOptions)
  }

  resetpassword(code: string, email: string, password: string): Observable<any> {
    let accessToken: any = localStorage.getItem('AccessToken');
    return this.http.post(this.endpoint + 'ResetPasswordByCode', {
      EmailAddress: email,
      AccessToken: accessToken,
      Password: password,
      PasswordResetCode: code
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