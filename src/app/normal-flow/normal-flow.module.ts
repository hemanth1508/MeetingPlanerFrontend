import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';

//import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent }
    ])
  ]
})
export class NormalFlowModule { }
