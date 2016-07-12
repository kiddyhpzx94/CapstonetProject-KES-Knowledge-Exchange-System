//cores
import { Component, OnInit, Input } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';

//components
import { PushNotificationComponent } from '../shared/notification';

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
  selector: 'request-record',
  templateUrl: 'client/dev/app/components/front-end/user-profile/templates/request-record.html',
  styleUrls: ['client/dev/app/components/front-end/user-profile/styles/user-profile.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PushNotificationComponent
  ]
})

export class RequestRecordComponent {
@Input('title') title: string;
@Input('description') description: string;
@Input('createdAt') createdAt: string;
@Input('knowledgeId') knowledgeId: string;
@Input('status') status: string;
@Input('requestId') requestId:string;

  // requests: Request[];

  knowledgeName: string;
  id: string;

  constructor(private router: Router, private route: ActivatedRoute, private _userService: UserService, private _knowledgeService: KnowledgeService) {

  }

  ngOnInit(): void {
    //this.createdAt = this.formatDate(createdAt);
    this.id = this.knowledgeId;
    this.getKnowledgeNameOfRequest();
  }

   public formatDate = function (date) {
     if (date) {
       var newDate, day, month, year;
       year = date.substr(0, 4);
       month = date.substr(5, 2);
       day = date.substr(8, 2);
       return newDate = day + '/' + month + '/' + year;
     }
   }

   public getKnowledgeNameOfRequest() {
     //get back.knowledge name by knowledgeId
     this._knowledgeService.findKnowledgeById(this.knowledgeId).subscribe(
       (knowledge) => {
         this.knowledgeName = knowledge.name;
       },
       (error) => {
         console.log(error);
       });
   }

}
