import { Component, OnInit } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public viewDate;
  public events: Array<Object> = [];
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public activeDayIsOpen: boolean = true;


  constructor() { }

  ngOnInit(): void {
    this.viewDate = new Date();
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  setView(view: CalendarView) {
    this.view = view;
  }
}
