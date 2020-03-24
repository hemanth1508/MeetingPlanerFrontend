import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserPlus, faEnvelope, faPaperPlane, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  faUserPlus = faUserPlus;
  faMeetup = faMeetup;
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  faSignInAlt = faSignInAlt;

  constructor(public route: Router) { }

  ngOnInit() {
  }
  public goToHome() {
    this.route.navigate(['/']);
  }

}
