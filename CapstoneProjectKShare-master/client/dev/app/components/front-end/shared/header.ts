/**
 * Created by GiangDH on 5/18/16.
 */
import { Component, OnChanges, SimpleChange } from '@angular/core';
import { ROUTER_DIRECTIVES, Router} from '@angular/router';

import { Notification } from '../../../interface/notification';

import { AuthService } from '../../../services/auth';
import { NotificationService } from '../../../services/notification';

import { PushNotificationComponent } from '../shared/notification';
import * as io from 'socket.io';

@Component({
  selector: 'header',
  templateUrl: 'client/dev/app/components/front-end/shared/templates/header.html',
  styleUrls: ['client/dev/app/components/front-end/shared/styles/header.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PushNotificationComponent]
})

export class HeaderComponent {
  loginToken: boolean = false;
  userToken: string;
  roleToken: string;
  countUnReadNoti: number;
  isDiffirent: boolean;

  notifications: Notification[];
  differ: Notification[];

  constructor(private _auth: AuthService, public router: Router, public _noti: NotificationService) {
    this.userToken = localStorage.getItem('username');
    this.roleToken = localStorage.getItem('userrole');
  }

  ngOnInit(): void {
    if (this.userToken) {
      this.loginToken = true;
    }

    // var socket = io('https://localhost:3333');

    // socket.emit('send notification', {
    //   hello: 'hello'
    // });

    this.getNotificationByUser();

    // setInterval(() => {
    //   this._noti.getNotificationByUser(this.userToken).subscribe(
    //     (notifications) => {
    //       this.notifications = notifications.reverse();
    //     }
    //   );

    //   if (this.differ.length !== this.notifications.length) {
    //     console.log('get new notification');
    //     this.differ = this.notifications;
    //     this.countUnReadNoti = 0;
    //     for (var i = 0; i < this.notifications.length; i++) {
    //       if (this.notifications[i].status === "Chưa đọc") {
    //         this.countUnReadNoti++;

    //       }
    //     }
    //   }
    // }, 3000);

  }

  logout(): void {
    this._auth.logout();
    this._auth.logoutClient();
    window.location.reload();
  }

  getNotificationByUser(): void {
    this.countUnReadNoti = 0;
    this._noti.getNotificationByUser(this.userToken).subscribe(
      (notifications) => {
        this.notifications = notifications;
        this.notifications.reverse();
        this.differ = this.notifications;
        console.log(this.differ);
        for (var i = 0; i < notifications.length; i++) {
          if (notifications[i].status === "Chưa đọc") {
            this.countUnReadNoti++;
          }
        }
      }
    );
  }

  changeStatusNotification(): void {
    this._noti.changeStatusNotification(this.userToken).subscribe(
      (notifications) => {
        console.log('change status notification successful');
      }
    )
  }

}
