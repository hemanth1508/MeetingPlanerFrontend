import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { UserModule } from './user/user.module';
import { FormsModule } from '@angular/forms';
import { SocketClientService } from './socket-client.service';
import { AppService } from './app.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeModule } from './home/home.module';
import { DeferLoadModule } from '@trademe/ng-defer-load';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    DeferLoadModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ToastrModule.forRoot(),
    FontAwesomeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [SocketClientService, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
