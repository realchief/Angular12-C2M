import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-myevents',
  templateUrl: './view-myevents.component.html'
})
export class ViewMyeventsComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title
  ) {
  }

  ngOnInit() {
  }
}
