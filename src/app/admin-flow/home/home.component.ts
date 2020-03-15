import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { SocketClientService } from 'src/app/socket-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [SocketClientService],

})
export class HomeComponent implements OnInit {

  public userList = [];
  public userInfo;
  public onlineUserList;
  constructor(public appService: AppService, public socketService: SocketClientService, public toastr: ToastrService, public router: Router) { }
  ngOnInit() {
    this.userInfo = this.appService.getAdminInfoFromLocalstorage();
    //  console.log(this.userInfo);
    this.getAllUserList();
    this.getOnlineUserList();


  }

  public getOnlineUserList() {
    this.socketService.getAllOnlineUserList().subscribe(
      data => {
        //console.log(data);  
        this.userList = [];
        this.getAllUserList();
      }
    )

  }

  public getAllUserList = () => {
    this.appService.getAllUserList(this.userInfo.adminId).subscribe(
      (result) => {
        if (result['status'] == 200) {
          for (let user of result['data']) {
            if (user.activated == true) {
              let detail = {
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.userId,
              }
              this.userList.push(detail);
            }
          }
          //    console.log(this.userList)
        }
      }
    )
  }

  public LogOut() {
    this.appService.logoutAdmin().subscribe(
      data => {
        if (data.status == 200) {
          Cookie.delete('authToken');
          Cookie.delete('loggedInAdmin');
          this.appService.deleteAdminInfoInLocalStorage()
          this.toastr.success(data.message);
          this.socketService.disconnect();

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000)
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


}
