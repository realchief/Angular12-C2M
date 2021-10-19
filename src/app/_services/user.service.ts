import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private apiService: ApiService
    ) { }

    getUserProfile(body: any) {
        return this.apiService.postWithOutHeader('GetUserProfile', body);
    }

    getUserGridList(bodyData: any) {
        return this.apiService.postWithOutHeader('GetAllManageUserListByApikey', bodyData);
    }

}