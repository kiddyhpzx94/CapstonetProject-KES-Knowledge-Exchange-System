//cores
import { Component, OnInit, DoCheck, Input  } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';
import * as io from 'socket.io';
//services
import { UserService } from '../../../services/users';
import { AuthService } from '../../../services/auth';
import { NotificationService } from '../../../services/notification';

//interfaces
import { User } from '../../../interface/user';
import { FriendShip } from '../../../interface/friendship';

@Component({
  selector: 'user-profile-bar',
  templateUrl: 'client/dev/app/components/front-end/user-profile/templates/user-profile-bar.html',
  styleUrls: ['client/dev/app/components/front-end/user-profile/styles/user-profile.css'],
  directives: [
    ROUTER_DIRECTIVES
  ]
})

export class UserProfileBarComponent {

  //name of user in current profile page
  name: string;

  isExist: boolean;
  isFriend: boolean;

  roleToken: string;
  userToken: string;

  //check if profile page of current user, hide "addFriend" button
  checkUser: boolean;

  //check if a user was sent friend request by current user
  checkSentRequestUser: boolean;

  //check if a current user is received a request of a user
  checkIsRecivedRequest: boolean;

  differ: any;

  userProfile: User;

  buttonTitle: string;

  friendList: FriendShip[];

  constructor(public router: Router, private route: ActivatedRoute, public _userService: UserService,
    public _noti: NotificationService) {
    this.route
      .params
      .subscribe(params => {
        this.name = params['name'];
      });
    this.roleToken = localStorage.getItem('role');
    this.userToken = localStorage.getItem('username');

  }

  ngOnInit(): void {
    this._userService.getUserByUserName(this.name).subscribe(
      (user) => {
        this.userProfile = user;
      },
      (error) => {
        console.log(error);
      }
    );

    this.checkUserExist();

    //check if current user is staying in his/her profile page
    if (this.name === this.userToken) {
      this.checkUser = true;
    }

    if (this.isExist = true) {
      this.getFriendList();
    }

  }

  addFriend(): void {
    this._userService
      .addFriend(this.userToken, this.name)
      .subscribe((r) => {
        console.log('friendship was created by ' + this.userToken + ' and ' + this.name);
      })
    //create a notification to user who get accepted a friend request
    var title = 'Lời mời kết bạn từ ' + this.userToken;
    var body = 'Bạn đã nhận được lời mời kết bạn của ' + this.userToken;
    var link = '/user/' + this.name + '/friends';

    alert("đã gửi lời mời kết bạn thành công");

    var socket = io('https://localhost:3333');
    socket.emit('send notification', {
      title: title,
      body: body,
      link: link,
      user: this.name
    });
    this._noti.createNotification(title, body, this.name, link).subscribe(
      (notification) => {
        console.log(notification);
        // this.countUnReadNoti = 0;
        // for (var i = 0; i < this.notifications.length; i++) {
        //   if (this.notifications[i].status === "Chưa đọc") {
        //     this.countUnReadNoti++;
        //   }
        // }
      });
  }

  deleteFriend(): void {
    this._userService
      .deleteFriendRequest(this.userToken, this.name)
      .subscribe(() => {
        console.log('delete successfull');
      })
    this.getFriendList();
    this.isFriend = false;
    alert("bạn đã hủy gửi lời  mời kết bạn");
  }

  //get friend list: pending and accepted
  getFriendList(): void {
    this.checkSentRequestUser = false;
    this._userService
      .getFriendList(this.userToken)
      .subscribe((friendlist) => {
        this.friendList = friendlist;
        this.checkIsFriend();
        //check sent request
        for (var i = 0; i < this.friendList.length; i++) {
          if (friendlist[i].user2 === this.name && this.friendList[i].status === "pending") {
            this.checkSentRequestUser = true;
            break;
          }
        }

        for (var i = 0; i < this.friendList.length; i++) {
          if (friendlist[i].user1 === this.name && this.friendList[i].status === "pending") {
            this.checkIsRecivedRequest = true;
            break;
          }
        }

      })
  }

  public notification: any = {
    show: false,
    title: 'Demo notification!',
    body: 'ng2-notifications',
    icon: 'https://goo.gl/3eqeiE',
    action: function () {
      window.open('https://github.com/alexcastillo/ng2-notifications');
    }
  };

  public formatDate = function (date) {
    if (date) {
      var newDate, day, month, year;
      year = date.substr(0, 4);
      month = date.substr(5, 2);
      day = date.substr(8, 2);
      return newDate = day + '/' + month + '/' + year;
    }
  }

  public checkUserExist() {
    this._userService.checkUserExist(this.name).subscribe(
      (isExist) => {
        if (isExist._body === '1') {
          this.isExist = true;
        } else {
          this.isExist = false;
        }

      },
      (error) => {
        console.log(error);
      });
  }

  public checkIsFriend() {
    for (var i = 0; i < this.friendList.length; i++) {
      if ((this.name === this.friendList[i].user1 && this.friendList[i].status === "accepted") ||
        (this.name === this.friendList[i].user2 && this.friendList[i].status === "accepted")) {
        this.isFriend = true;
        break;
      }
    }
  }

}
