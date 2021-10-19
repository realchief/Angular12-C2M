import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  title = 'c2m';

  constructor(
    private router: Router
    ) {}

  ngOnInit() { }
}
