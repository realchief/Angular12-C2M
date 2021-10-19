import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { ApplicationService } from '../../_services/application.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  appList: any[] = [];
  AccessManagement: any = null;
  parentAllList: any;
  currentUser: any;

  constructor(
    private userService: UserService,
    private applicationService: ApplicationService
  ) {
    this.loadGrid();
    this.getUserProfile();
  }

  ngOnInit(): void {
    
  }

  loadGrid() {
    const getProcessSubr = this.applicationService.getProcesswf()
      .subscribe(data => {
        if (Array.isArray(data.data.myApps.parentApp)) {
          this.appList = data.data.myApps.parentApp;
        } else if (!data.data.myApps.parentApp) {
          this.appList = [];
        } else {
          this.appList = [data.data.myApps.parentApp];
        }
      });
  }

  getUserProfile() {
    const email = localStorage.getItem('Email');
    const accessToken = localStorage.getItem('AccessToken');
    const apiKey = localStorage.getItem('APIKey');

    const body = {
      "EmailAddress": email,
      "AccessToken": accessToken,
      "APIKey": apiKey
    }
    const getProcessSubr = this.userService.getUserProfile(body)
      .subscribe(data => {
        if (data.code = '8024') {
          this.currentUser = data.data.User;
        }
      });
  }

  getChildAppImg(app: any) {
    return Object.values(app.ImageUrl)[0] || 'assets/images/cattle-icon.png';
  }

  getChildApps(apps: any) {
    let childapp = Array.isArray(apps) ? apps : [apps];
    return childapp;
  }

  OpenApp(objApp: any): void {
    sessionStorage.AppName = objApp.AppName;
    console.log(objApp.AppName);
    switch (objApp.AppName) {
      case 'Users':
        window.open('/users/management', '_blank');
        break;
      case 'Renesas_FeedbackManagement':
        window.open('/feedback/grid', '_blank');
        break;
      case 'Renesas_DeviceProfMgmnt':
        window.open('/device-profile/management', '_blank');
        break;
      case 'RenesasOrderManagement':
        window.open('/order/grid', '_blank');
        break;
      case 'Renesas_AddEvent':
        window.open('/events/viewEvents', '_blank');
        break;
      case 'Renesas_DevicesMgmt':
        window.open('/device/management', '_blank');
        break;
      case 'Renesas_SIMMgmt':
        window.open('/sim/management', '_blank');
        break;
      case 'CompanyManagement':
        sessionStorage.getItem('gridGid');
        window.open('/company/grid', '_blank');
        break;
      case 'ClientManagement':
        window.open('/client/grid', '_blank');
        break;
      case 'Renesas_EventMgmt':
        window.open('/events/viewEventMgt', '_blank');
        break;
      case 'Renesas_NewEventMagmt':
        window.open('/events/viewNewEventMgt', '_blank');
        break;
      case 'Firmware_DownloadMgt':
        window.open('/firmware-download/management/admin-Firmware/admin', '_blank');
        break;
      case 'FirmwareDownload':
        window.open('/firmware-download/management', '_blank');
        break;
      case 'Renesas_FAQs':
        window.open('/faq/management', '_blank');
        break;
      case 'Firmware_Campaign':
        window.open('/firmware-campaign-screens/management', '_blank');
        break;
    }
  }
}