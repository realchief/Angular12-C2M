import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { AccessManagement, User } from 'src/app/_models/user';
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
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  get currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private tokenStorage: TokenStorageService
  ) {
    const accessToken = localStorage.getItem('AccessToken');
    if (!accessToken) {
      this.http.post(this.endpoint + '/GetAccessToken', {
        UserName: environment.Setting.ADMIN_USERNAME,
        Password: environment.Setting.ADMIN_USER_PASSWORD,
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
    // const accessToken = localStorage.getItem('AccessToken');
    return this.http.post(this.endpoint + '/GetAccessToken', {
      UserName: username,
      Password: password,
      AppKey: environment.Setting.AppKey,
      AppSecret: environment.Setting.AppSecret,
      // AccessToken: accessToken
    }, httpOptions);
  }

  storeToken(username: string, password: string): Observable<any> {
    return this.tokenStorage.store_token(username, password)
  }

  forgotpassword(email: string): Observable<any> {
    let accessToken: any = localStorage.getItem('AccessToken');
    return this.http.post(this.endpoint + '/SendCodeForResetPassword', {
      EmailAddress: email,
      AccessToken: accessToken,
      FromEmail: environment.Setting.FromEmail,
    }, httpOptions)
  }

  resetpassword(code: string, email: string, password: string): Observable<any> {
    let accessToken: any = localStorage.getItem('AccessToken');
    return this.http.post(this.endpoint + '/ResetPasswordByCode', {
      EmailAddress: email,
      AccessToken: accessToken,
      Password: password,
      PasswordResetCode: code
    }, httpOptions);
  }

  logout(): void {
      localStorage.removeItem('APIKey');
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.endpoint + '/SignUpUser', {
      UserName: username,
      EmailAddress: email,
      FirstName: "Rohit",
      MiddleName: "",
      LastName: "Roy",
      PhoneNumber: "+915566544433",
      PolicyBundleId: "11",
      GroupId: "1464",
      RoleIDs: "357,93,365,356",
      AccessToken: "test"
    }, httpOptions);
  }
}
