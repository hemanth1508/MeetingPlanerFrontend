import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { FlatpickrModule } from 'angularx-flatpickr';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngb-modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

//import { FormsModule } from '@angular/forms';
library.add(faCoffee);



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    FontAwesomeModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent }
    ])
  ]
})
export class NormalFlowModule { }
