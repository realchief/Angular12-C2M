import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  checkValidation: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private apiService: ApiService) { }

  checkValidations() {
    this.checkValidation.next(true);
  }

  getProcesswf(){
    // const apikey = environment.Setting.ADMIN_USER_APIKey;
    const apikey = localStorage.getItem("APIKey");
    return this.apiService.get(`GetMyAppsDetails?apiKey=${apikey}`);
  }

  openTermsCondition() {
    let headers = new HttpHeaders({ Accept: 'application/pdf' });
    this.http.get<any>('/assets/styles/docs/tos.pdf', { headers, responseType: 'blob' as 'json' })
      .pipe(first())
      .subscribe(data => {
        const fileUrl = URL.createObjectURL(data);
        window.open(fileUrl, '_blank');
      });
  }

  openEVKPDF() {
    let headers = new HttpHeaders({ Accept: 'application/pdf' });
    this.http.get<any>('/assets/styles/docs/EVK_Data_Sheet.pdf', { headers, responseType: 'blob' as 'json' })
      .pipe(first())
      .subscribe(data => {
        const fileUrl = URL.createObjectURL(data);
        window.open(fileUrl, '_blank');
      });
  }

}
