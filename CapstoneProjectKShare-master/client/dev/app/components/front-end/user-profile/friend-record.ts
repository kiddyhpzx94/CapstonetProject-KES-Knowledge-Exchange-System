//cores
import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';

//components
import { PushNotificationComponent } from '../shared/notification';

//services
import { UserService } from '../../../services/users';
import { AuthService } from '../../../services/auth';;

//interfaces
import { User } from '../../../interface/user';
import { FriendShip } from '../../../interface/friendship';

@Component({
  selector: 'friend-record',
  templateUrl: 'client/dev/app/components/front-end/user-profile/templates/friend-record.html',
  styleUrls: ['client/dev/app/components/front-end/user-profile/styles/user-profile.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PushNotificationComponent
  ]
})

export class FriendRecordComponent {
  @Input('friendName') friendName: string;
  displayname: string;
  email: string;
  level: string;
    
  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService) {
      
  }

  ngOnInit(): void {
    this.getUserInformation();  
  }

  getUserInformation():void {
    this._userService.getUserByUserName(this.friendName).subscribe(
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

}
