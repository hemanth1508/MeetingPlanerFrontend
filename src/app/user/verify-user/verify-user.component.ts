import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import {
  faUserPlus, faEnvelope, faPaperPlane, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  public userId;
  public secretId;
  public simple;

  constructor(public appService: AppService, public active: ActivatedRoute, public router: Router, private toastr: ToastrService) {
  }
  faUserPlus = faUserPlus;
  faMeetup = faMeetup;
  faPaperPlane = faPaperPlane;
  faEnvelope = faEnvelope;
  faSignInAlt = faSignInAlt;
  ngOnInit(): void {
    this.userId = this.active.snapshot.paramMap.get('userId');
    this.secretId = this.active.snapshot.paramMap.get('secretKey');

    this.accountVerify();
  }

  public accountVerify() {
    let detail = {
      userId: this.userId,
      secretId: this.secretId
    }
    this.appService.accountVerify(detail).subscribe(
      data => {
        this.simple = data['status'];
      }
    )
  }


}
