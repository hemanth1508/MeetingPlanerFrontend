import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-admin-email-verify',
  templateUrl: './admin-email-verify.component.html',
  styleUrls: ['./admin-email-verify.component.css']
})
export class AdminEmailVerifyComponent implements OnInit {

  public adminId;
  public secretId;
  public simple;

  constructor(public appService: AppService, public active: ActivatedRoute, public router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.adminId = this.active.snapshot.paramMap.get('adminId');
    this.secretId = this.active.snapshot.paramMap.get('secretKey');
    this.accountVerify();

  }
  public accountVerify() {
    let detail = {
      adminId: this.adminId,
      secretId: this.secretId
    }
    this.appService.accountVerifyAdmin(detail).subscribe(
      data => {
        this.simple = data['status'];
      }
    )
  }

}
