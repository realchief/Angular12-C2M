import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = environment.Setting.BaseAPIUrl;

  constructor(private http: HttpClient) { }

  setHeaders() {
    let headers;
    const atoken = localStorage.getItem('AccessToken') || '';
    headers = new HttpHeaders({ accessToken: atoken });
    return headers;
  }

  setHeaders_with_apikey() {
    let headers;
    const atoken = localStorage.getItem('AccessToken') || '';
    const apikey = localStorage.getItem('APIKey') || '';
    headers = new HttpHeaders({ 
      accessToken: atoken,
      apiKey: apikey
    });
    return headers;
  }

  setParams(parameters: any) {
    let params = new HttpParams();
    if (parameters) {
      for (const i in parameters) {
        if (parameters[i] != null) {
          params = params.append(i, parameters[i]);
        }
      }
    }
    return params;
  }

  get(url: string, parameters?: any): Observable<any> {
    const headers = this.setHeaders();
    const params = this.setParams(parameters);
    return this.http.get<any>(`${this.endpoint}/${url}`, { headers, params });
  }

  post(url: string, data: any, parameters?: any): Observable<any> {
    const headers = this.setHeaders();
    const params = this.setParams(parameters);
    return this.http.post<any>(`${this.endpoint}/${url}`, data, { headers, params });
  }

  postWithApiKey(url: string, data: any, parameters?: any): Observable<any> {
    const headers = this.setHeaders_with_apikey();
    const params = this.setParams(parameters);
    return this.http.post<any>(`${this.endpoint}/${url}`, data, { headers, params });
  }

  postWithOutHeader(url: string, data: any): Observable<any> {
    return this.http.post(`${this.endpoint}/${url}`, data);
  }

  postGetFile(url: string, data: any, resultType: any): Observable<any> {
    const Headers = this.setHeaders();
    return this.http.post<any>(`${this.endpoint}/${url}`, data, { headers: Headers, responseType: resultType });
  }

  put(url: string, data: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.put<any>(`${this.endpoint}/${url}`, data, {headers});
  }

  update(url: string, objectId: string, data: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.patch<any>(`${this.endpoint}/${url}/${objectId}`, data, {headers});
  }

  delete(url: string, objectId: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete(`${this.endpoint}/${url}/${objectId}`, {headers});
  }
  deleteGrid(url: string): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete(`${this.endpoint}/${url}`, {headers}).pipe();
  }
  UploadFile(url: string, formData: FormData): Observable<any> {
    const Headers = this.setHeaders();
    return this.http.post<any>(`${this.endpoint}/${url}`, formData, { headers: Headers });
  }

  DeleteFile(url: string, formData: FormData): Observable<any> {
    const Headers = this.setHeaders();
    return this.http.post<any>(`${this.endpoint}/${url}`, formData, { headers: Headers });
  }

  downloadfile(url: string, formData: FormData, resultType: any): Observable<any> {
    const Headers = this.setHeaders();
    return this.http.post<any>(`${this.endpoint}/${url}`, formData, { headers: Headers, responseType: resultType });
  }
}
