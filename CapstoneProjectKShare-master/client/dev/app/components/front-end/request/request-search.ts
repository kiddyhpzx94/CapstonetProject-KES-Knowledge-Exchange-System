import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
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

  id: string;
  type: string;

  constructor(private _requestService: RequestService, public router: Router, private route: ActivatedRoute) {
    this.route
      .params
      .subscribe(params => {
        this.id = params['id'];
        this.type = params['type'];
      });
  }
  requests: Request[];
  knowledges: Knowledge[];

  ngOnInit(): void {
    //get templates from children category
    if (this.type === "	") {
      this._requestService.getRequestByKnowledgeId(this.id).subscribe(
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
    if (this.type === "category") {
      this._requestService.getKnowledgeByParent(this.id).subscribe(
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
}
