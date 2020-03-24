import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import {
  CalendarEvent, CalendarEventTimesChangedEvent, CalendarView
} from 'angular-calendar';

//logos
import {
  faPowerOff, faCog, faGift, faBars,
  faUserCircle, faCalendarAlt, faEnvelope, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faMeetup } from '@fortawesome/free-brands-svg-icons';

import { SocketClientService } from 'src/app/socket-client.service';
import { AppService } from 'src/app/app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { ModalManager } from 'ngb-modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [SocketClientService]
})
export class DashboardComponent implements OnInit {
  public userInfo;
  public reminder;
  public messageList;

  public viewDate: Date;
  public events: CalendarEvent[] = [];
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public activeDayIsOpen: boolean = true;
  refresh: Subject<any> = new Subject();
  faPowerOff = faPowerOff;
  faCog = faCog;
  faGift = faGift;
  faGithub = faGithub;
  faBars = faBars;
  faUser = faUserCircle;
  faCalendarAlt = faCalendarAlt;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faMeetup = faMeetup;

  constructor(
    public socketService: SocketClientService,
    public appService: AppService,
    public toastr: ToastrService,
    private modalService: ModalManager,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewDate = new Date();
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.verifyUser();
    this.getAllEvents();
    this.messageFromAdmin();
    this.getReminder();
  }

  public getAllEvents() {
    this.appService.getAllMessage(this.userInfo.userId).subscribe(
      data => {
        if (data['status'] == 200) {
          for (let event of data['data']) {
            event.start = new Date(event.start);
            event.end = new Date(event.end);
            this.events.push(event);
            this.refresh.next();
          }
        }
        else {
          this.toastr.warning(data['message'])
        }
      }
    )
  }
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('alert') alert: TemplateRef<any>;
  modalData: {
    action: string;
    event: CalendarEvent;
  };


  public verifyUser() {
    this.socketService.verify().subscribe(
      data => {

        this.socketService.setUser();
      })
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  public LogOut() {
    this.appService.logout().subscribe(
      data => {
        if (data.status == 200) {
          Cookie.delete('authToken');
          Cookie.delete('loggedInUser');
          this.appService.deleteUserInfoInLocalStorage()
          this.toastr.success(data.message);

          this.socketService.disconnect();

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000)
        } else {
          this.router.navigate(['/']);

        }
      },
      (err) => {
        this.toastr.error(err.error.message);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000)
      }
    )
  }

  public getReminder() {
    this.socketService.messageFromAdmin(this.userInfo.userId).subscribe(
      data => {
        this.reminderLoop(data)


      }
    )
  }
  public reminderLoop(data) {
    let currentTime = new Date();
    let messageIme = new Date(data.start);
    let takeDifferece = messageIme.getTime() - currentTime.getTime();
    let minutes = takeDifferece / 60000;
    if (data.alert == true && takeDifferece > 0) {
      const options = { closeButton: true, progressBar: true, timeOut: 5000, tapToDismiss: true };
      const alertInstance = this.toastr.success(`few minutes left to start meeting`, data.title, options);
      alertInstance.onTap.subscribe(() => {
        data.alert = false;
        this.socketService.stopReminder(data);
      });
      alertInstance.onHidden.subscribe(() => {
        setTimeout(() => {
          this.reminderLoop(data)
        }, 3000)
      });
    }
  }

  public messageFromAdmin() {
    this.socketService.messageFromAdmin(this.userInfo.userId).subscribe(
      data => {
        if (data['status'] == 200) {
          this.toastr.success(data['message']);

          this.events = [];
          this.getAllEvents();
        }

      }
    )
  }
}
