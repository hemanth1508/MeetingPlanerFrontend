import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-verify-admin',
  templateUrl: './verify-admin.component.html',
  styleUrls: ['./verify-admin.component.scss']
})
export class VerifyAdminComponent implements OnInit {

  public adminId;
  public secretId;
  public simple;

  constructor(public appService: AppService, public active: ActivatedRoute, public router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
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
