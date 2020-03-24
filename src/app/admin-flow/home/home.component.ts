import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { SocketClientService } from 'src/app/socket-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {
  faPowerOff, faCog, faGift, faBars,
  faUserCircle, faCalendarAlt, faEnvelope, faPaperPlane, faGrinAlt
} from '@fortawesome/free-solid-svg-icons';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';

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

  faPowerOff = faPowerOff;
  faCog = faCog;
  faGift = faGift;
  faBars = faBars;
  faUser = faUserCircle;
  faCalendarAlt = faCalendarAlt;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faMeetup = faMeetup;
  faGrinAlt = faGrinAlt;

  ngOnInit() {
    this.userInfo = this.appService.getAdminInfoFromLocalstorage();
    //console.log(this.userInfo);
    this.getAllUserList();
    this.getOnlineUserList();


  }

  public gotoUserList() {
    let el = document.getElementById('userList');
    console.log(el)
    window.location.hash = "#userList";
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
                email: user.email
              }
              this.userList.push(detail);
            }
          }
          console.log(this.userList)
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
