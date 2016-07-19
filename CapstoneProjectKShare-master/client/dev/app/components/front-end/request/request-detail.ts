import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute} from'@angular/router';

import { Request } from '../../../interface/request';
import { KSpace } from '../../../interface/kspace.ts';
import { Offer } from '../../../interface/offer';
import { Knowledge } from '../../../interface/knowledge';

import { RequestService } from '../../../services/requests';
import { OfferService } from '../../../services/request-offer';
import { KnowledgeService } from '../../../services/knowledge';
import { KSpaceService } from '../../../services/kspace';

import { HeaderComponent } from '../shared/header';
import { FooterComponent } from '../shared/footer';
import { SideBarComponent } from '../shared/side-bar';
import { FriendListComponent} from '../shared/friend-list';

import { CreateOfferComponent } from '../offer/offer-create';

@Component({
    selector: 'request-detail-cli',
    templateUrl: 'client/dev/app/components/front-end/request/templates/request-detail.html',
    styleUrls:  ['client/dev/app/components/front-end/request/styles/request.css'],
    directives: [
      ROUTER_DIRECTIVES,
      CreateOfferComponent
    ]
})


export class RequestDetailClientComponent {

  pageTitle:string = 'Welcome to Knowledge Sharing Network';

  id: string;
  _id: string;
  updateLink: string;
  rid: string;
  roleToken: string;
  userToken: string;
  knowledge: Knowledge;
  request: Request;
  user: string;
  knowledgeId: string;
  subscribers: string[];

  //varialbe check to hide button when the status is deactive
  checkDeactive: boolean;

  //variable check to hide button, user can't front.offer their of templates
  checkCreatedUser: boolean;
  
  //variable check to hide button, user can't subcribe twice in a templates
  checkSubcribedUser: boolean;
  offers: Offer[];

  constructor(private _requestService:RequestService, private _offerService:OfferService, public router:Router,
              private _knowledgeService:KnowledgeService , private _kspaceService: KSpaceService, private route: ActivatedRoute) {
    this.route
      .params
      .subscribe(params => {
        this.id = params['id'];
      });
    this.roleToken = localStorage.getItem('role');
    this.userToken = localStorage.getItem('username');
  }
  ngOnInit():void {
    //get templates when load the page
    this._requestService.getRequestById(this.id)
      .subscribe(request => {
          var formatDate = function (date) {
            if (date) {
              var newDate, day, month, year;
              year = date.substr(0, 4);
              month = date.substr(5, 2);
              day = date.substr(8, 2);
              return newDate = day + '/' + month + '/' + year;
            }
          };
          request.createdAt = formatDate(request.createdAt);
          request.userlink = '/user/'+request.user;
          this._id = request._id;
          this.updateLink = '/requests/'+ request._id + '/update';

          this.knowledgeId = request.knowledgeId;
          this.subscribers = request.subcribers;

          if (request.status === "deactive") {
            this.checkDeactive = true;
          }

          if (request.user === this.userToken) {
            this.checkCreatedUser = true;
          }

          for (var i = 0; i < this.subscribers.length; i++) {
            if (this.userToken === this.subscribers[i]) {
              this.checkSubcribedUser = true;
              break;
            }
          }
        this.request = request;

          //get back.knowledge name by knowledgeId
          this._knowledgeService.findKnowledgeById(this.knowledgeId)
            .subscribe(
              knowledge => {
                this.knowledge = knowledge;
                //this.knowledgeName = this.knowledge.name;
              },
              error => {
                console.log(error);
              }
            );
        }, error => console.log(error));
    //get front.offer of the templates when load the page
    this._offerService.getOfferByRequestId(this.id).subscribe(
      (offers) => {
        var formatDate = function (date) {
          if (date) {
            var newDate, day, month, year;
            year = date.substr(0, 4);
            month = date.substr(5, 2);
            day = date.substr(8, 2);
            return newDate = day + '/' + month + '/' + year;
          }
        };

        for (var i = 0; i < offers.length; i++) {
          offers[i].createdAt = formatDate(offers[i].createdAt);
        }
        this.offers = offers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deactivateRequest(id: String) {
    var r = confirm("Bạn có muốn kết thúc yêu cầu này?");
    if (r == true) {
      this._requestService
        .changeStatusRequest(this.id)
        .subscribe((r) => {
          console.log("deactivate sucess");
          this.router.navigateByUrl('/kshare/requests/');
        })
    }

  }

  addKshare(learner: string, lecturer: string, requestId: string, offerId: string): void {
    this._kspaceService
      .addKSpace(learner, lecturer, requestId, offerId)
      .subscribe((r) => {
        //this._chatService.addChatRoom(r._id)
        //  .subscribe((c) => {
        //    this.rid = c._id;
        //    console.log("add chat room successfull");
        //    this.router.navigateByUrl('/kshare/front.kspace/' + r._id + '/' + this.rid);
        //  });
      })
  }

  addSubcriber(id: string): void {
    if (this.checkSubcribedUser == true) {
      alert('Bạn đã theo dõi vài viết này');
    } else {
      this._requestService
        .updateSubcriber(id, this.userToken)
        .subscribe((r) => {
          console.log(r);
          console.log("add subcriber successfull");
          this.checkSubcribedUser = true;
        });
      this._requestService.getRequestById(this.id).subscribe(
        (request) => {
          this.subscribers = request.subcribers;
        }
      );
    }

  }

}

