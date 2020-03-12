import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    RouterModule.forChild([
      { path: 'admin/dashboard', component: AdminDashboardComponent }
    ])
  ]
})
export class AdminFlowModule { }
