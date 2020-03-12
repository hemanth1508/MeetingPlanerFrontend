import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { FlatpickrModule } from 'angularx-flatpickr'
import { UserModule } from './user/user.module';
import { AdminFlowModule } from './admin-flow/admin-flow.module';
import { NormalFlowModule } from './normal-flow/normal-flow.module';
import { FormsModule } from '@angular/forms';
import { SocketClientService } from './socket-client.service';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminFlowModule,
    NormalFlowModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot()
  ],
  providers: [SocketClientService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
