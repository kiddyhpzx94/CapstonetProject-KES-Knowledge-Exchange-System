//cores
import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';

//components
import { PushNotificationComponent } from '../shared/notification';

//services
import { UserService } from '../../../services/users';
import { AuthService } from '../../../services/auth';
import { NotificationService } from '../../../services/notification';

//interfaces
import { User } from '../../../interface/user';
import { FriendShip } from '../../../interface/friendship';

@Component({
  selector: 'request-friend-record',
  templateUrl: 'client/dev/app/components/front-end/user-profile/templates/request-friend-record.html',
  styleUrls: ['client/dev/app/components/front-end/user-profile/styles/user-profile.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PushNotificationComponent
  ]
})

export class RequestFriendRecordComponent {
  @Input('requestUser') requestUser: string;
  @Input('name') name: string;

  displayname: string;
  email: string;
  level: string;

  isFriend: boolean;

  isAdded: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService,
    public _noti: NotificationService) {
    this.route
      .params
      .subscribe(params => {
        this.name = params['name'];
      });
  }

  ngOnInit(): void {
    this.isAdded = false;
    this.isFriend = true;
    this.getUserInformation();
  }

  acceptRequest(): void {
    this._userService.acceptFriendRequest(this.requestUser, this.name).subscribe(
      () => {
        console.log("accepted successful");
        alert("Bạn đã là bạn bè với " + this.requestUser);
        this.isAdded = true;

        var title = this.name + ' chấp nhận kết bạn';
        var body = 'Bạn và ' + this.name + ' đã là bạn bè!';
        var link = '/user/' + this.name;

        this._noti.createNotification(title, body, this.requestUser, link).subscribe(
          (notification) => {
            console.log('create a notification to ' + this.name);
          });
      }
    );
  }

  getUserInformation(): void {
    this._userService.getUserByUserName(this.requestUser).subscribe(
      (userinfo) => {
        this.displayname = userinfo.displayName;
        this.email = userinfo.email;
        this.level = userinfo.level;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteFriend(): void {
    this._userService
      .deleteFriendRequest(this.requestUser, this.name)
      .subscribe(() => {
        console.log('delete successfull');
      })
    this.isFriend = false;
    alert("bạn đã hủy gửi lời  mời kết bạn");
  }

}
