import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { GenericGridComponent } from './components/generic-grid/generic-grid.component';

@NgModule({
  declarations: [
    GenericGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    GenericGridComponent,
    ReactiveFormsModule,
    RouterModule    
  ]
})
export class SharedModule { }
