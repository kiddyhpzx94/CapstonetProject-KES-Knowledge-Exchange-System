//cores
import { Component, OnInit, DoCheck  } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';

//components
import { PushNotificationComponent } from '../shared/notification';
import { RequestRecordComponent } from './request-record';

//services
import { UserService } from '../../../services/users';
import { AuthService } from '../../../services/auth';
import { KnowledgeService } from '../../../services/knowledge';

//interfaces
import { User } from '../../../interface/user';
import { FriendShip } from '../../../interface/friendship';
import { Request } from '../../../interface/request';
import { Knowledge } from '../../../interface/knowledge';

@Component({
  selector: 'user-profile',
  templateUrl: 'client/dev/app/components/front-end/user-profile/templates/user-profile.html',
  styleUrls: ['client/dev/app/components/front-end/user-profile/styles/user-profile.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PushNotificationComponent,
    RequestRecordComponent
  ]
})

export class UserProfileComponent implements DoCheck {

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

  differ: any;

  userProfile: User;

  buttonTitle: string;

  friendList: FriendShip[];

  requests: Request[];

  knowledgeName: string;

  constructor(public router: Router, private route: ActivatedRoute, public _userService: UserService,
    public _knowledgeService: KnowledgeService) {
    this.route
      .params
      .subscribe(params => {
        this.name = params['name'];
      });
    this.roleToken = localStorage.getItem('role');
    this.userToken = localStorage.getItem('username');
    this.buttonTitle = "Thêm bạn";

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
      this.getRequestByUser();
    }
    
    // setTimeout(() => {
    //   this.differ = this.friendList;
    //   console.log(this.friendList);
    //   console.log(this.differ);
    // }, 1000);

  }

  ngDoCheck(): void {
    //boolean change = this.differ.diff(this.friendlist);
    var isDiffirent;
    setTimeout(() => {
      if (this.differ !== this.friendList) {
        isDiffirent = true;
      }
      if (this.differ === this.friendList) {
        isDiffirent = false;
      }
      
    }, 1000);

  }

  addFriend(): void {
    this._userService
      .addFriend(this.userToken, this.name)
      .subscribe((r) => {
        console.log('friendship was created by ' + this.userToken + ' and ' + this.name);
      })

    this.getFriendList();
    alert("đã gửi lời mời kết bạn thành công");
    // setTimeout(() => {
    //   console.log(this.friendList);
    //   console.log(this.differ);
    // }, 1000);

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

  getRequestByUser(): void {
    this._userService
      .getRequestByUser(this.name)
      .subscribe((requests) => {
        for (var i = 0; i < requests.length; i++) {
          requests[i].createdAt = this.formatDate(requests[i].createdAt);
          requests[i].modifiedDate = this.formatDate(requests[i].modifiedDate);
        }
        this.requests = requests;
        console.log(this.requests);
      })
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

  public getKnowledgeNameOfRequest(knowledgeId) {
    //get back.knowledge name by knowledgeId
    this._knowledgeService.findKnowledgeById(knowledgeId).subscribe(
      (knowledge) => {
        this.knowledgeName = knowledge.name;
      },
      (error) => {
        console.log(error);
      });
  }

  public checkUserExist() {
    this._userService.checkUserExist(this.name).subscribe(
      (isExist) => {
        if (isExist._body === '1') {
          this.isExist = true;
        } else {
          this.isExist = false;
        }
        console.log(this.isExist);
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
