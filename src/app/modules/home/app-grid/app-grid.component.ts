import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { ApplicationService } from 'src/app/_services/application.service';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-app-grid',
    templateUrl: './app-grid.component.html'
})
export class AppGridComponent implements OnInit, OnDestroy {

    dataSource: any;
    itemsCount = 0;

    constructor(
        private applicationService: ApplicationService,
        private titleService: Title
    ) {
        sessionStorage.setItem('AppTitle', 'Manage App');
        this.loadGrid();
    }

    ngOnInit() {
        this.titleService.setTitle('ONE | Manage App');        
    }


    loadGrid() {
        const getProcessSubr = this.applicationService.getProcesswf()
          .subscribe(data => {
            console.log(data.data.myApps.parentApp);
            if (Array.isArray(data.data.myApps.parentApp)) {
              this.dataSource = data.data.myApps.parentApp;
            } else if (!data.data.myApps.parentApp) {
              this.dataSource = [];
            } else {
              this.dataSource = [data.data.myApps.parentApp];
            }
          });
      }

    ngOnDestroy() {
        sessionStorage.removeItem('AppTitle');
    }

}
