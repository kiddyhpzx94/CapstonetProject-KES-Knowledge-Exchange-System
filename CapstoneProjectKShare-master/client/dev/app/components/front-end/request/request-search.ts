import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {RouteParams} from '@angular/router-deprecated';
import { Request } from '../../../interface/request';
import { Knowledge } from '../../../interface/knowledge';

import { RequestService } from '../../../services/requests';

@Component({
  selector: 'request-search-cli',
  templateUrl: 'client/dev/app/components/front-end/request/templates/request-search.html',
  styleUrls: ['client/dev/app/components/front-end/request/styles/request.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class RequestCategoryComponent {
  @Input() search: string;
  pageTitle: string = 'Welcome to Knowledge Sharing Network';

  // id: string;
  // type: string;
  identify: string;
  typee: string;
  constructor(private _requestService: RequestService, public router: Router, 
                  private route: ActivatedRoute) {
    this.route
      .params
      .subscribe(params => {
        let type = params['type'];
        this.typee = type;
        let id = params['id'];
        this.identify = id;
      });

      //get templates from children category
    if (this.typee === "subcategory") {
      this._requestService.getRequestByKnowledgeId(this.identify).subscribe(
        (requests) => {
          //format date
          var formatDate = function (date) {
            if (date) {
              var newDate, day, month, year;
              year = date.substr(0, 4);
              month = date.substr(5, 2);
              day = date.substr(8, 2);
              return newDate = day + '/' + month + '/' + year;
            }
          }
          for (var i = 0; i < requests.length; i++) {
            requests[i].createdAt = formatDate(requests[i].createdAt);
            requests[i].modifiedDate = formatDate(requests[i].modifiedDate);
          }
          this.requests = requests;
        });
    }

    //get templates from parent category
    if (this.typee === "category") {
      this._requestService.getKnowledgeByParent(this.identify).subscribe(
        (knowledges) => {
          var formatDate = function (date) {
            if (date) {
              var newDate, day, month, year;
              year = date.substr(0, 4);
              month = date.substr(5, 2);
              day = date.substr(8, 2);
              return newDate = day + '/' + month + '/' + year;
            }
          };
          var a = [];
          this.knowledges = knowledges;
          for (var i = 0; i < this.knowledges.length; i++) {
            this._requestService.getRequestByKnowledgeId(this.knowledges[i]._id).subscribe(
              (requests) => {
                //for each child knowledge get requests
                for (var j = 0; j < requests.length; j++) {
                  a.push(requests[j]);
                }

                for (var i = 0; i < a.length; i++) {
                  a[i].createdAt = formatDate(requests[i].createdAt);
                  a[i].modifiedDate = formatDate(requests[i].modifiedDate);
                }
                this.requests = a;
              });
          }
        },
        (Error) => {
          console.log(Error);
        });
    }
 
  }
  requests: Request[];
  knowledges: Knowledge[];


}
