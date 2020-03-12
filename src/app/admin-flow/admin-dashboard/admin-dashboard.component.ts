import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public viewDate: Date;
  public events: Array<Object> = [];


  constructor() { }

  ngOnInit(): void {
    this.viewDate = new Date();
  }

}
