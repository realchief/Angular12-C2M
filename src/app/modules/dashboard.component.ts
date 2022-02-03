import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  title = 'c2m';
  currentRoute = "";
  constructor(
    private router: Router
    ) {
      this.router.events.subscribe( (e) => {
        if (e instanceof NavigationEnd) {
            this.currentRoute = e.url;
            console.log(e.url);
        }
    });
    }

  ngOnInit() {
    console.log(this.router.url);
   }
}
