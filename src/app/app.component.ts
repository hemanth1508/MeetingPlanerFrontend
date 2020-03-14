import { Component } from '@angular/core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faApple, faAndroid, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MeetingPlanner';

  faCopyright = faCopyright;
  faApple = faApple;
  faAndroid = faAndroid;
  faGithub = faGithub;
}
