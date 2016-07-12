import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control } from '@angular/common';


import { Request } from '../../../interface/request';
import { RequestService } from '../../../services/requests';
import { AuthService} from '../../../services/auth';
import { OfferService } from '../../../services/request-offer';

import { CreateRequestComponent } from './request-create';
import { CreateOfferComponent  } from '../../front-end/offer/offer-create';
import { UpdateRequestComponent } from './request-update';

@Component({
  selector: 'request-list',
  templateUrl: 'client/dev/app/components/back-end/request/templates/request-list.html',
  styleUrls: [
    'client/dev/asserts/css/backend-styles.css',
    'client/dev/app/components/back-end/request/templates/request.css'
  ],
  directives: [
    CreateOfferComponent,
    UpdateRequestComponent,
    CreateRequestComponent,
    CreateOfferComponent,
    ROUTER_DIRECTIVES
  ]
})

export class RequestListComponent {
  pageTitle: string = 'Request List';
  errorMessage: string;

  requests: Request[];

  constructor(private _requestService: RequestService, private _auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this._requestService.getAllRequests().subscribe((requests) => {
      var formatDate = function (date){
        if(date) {
          var newDate, day, month, year;
          year = date.substr(0, 4);
          month = date.substr(5, 2);
          day = date.substr(8, 2);
          return newDate = day + '/' + month + '/' + year;
        }
      };

      for (var i = 0; i < requests.length; i++) {
        requests[i].createdAt = formatDate(requests[i].createdAt);
        requests[i].modifiedDate = formatDate(requests[i].modifiedDate);
      }
      this.requests = requests;
    });
  }

  deleteRequest(request: Request) {
    console.log(request);
    this._requestService
      .deleteRequest(request)
      .subscribe(() => {
        console.log("delete successful");
      });

    //refresh page
    this._requestService.getAllRequests().subscribe((requests) => {
      var formatDate = function (date) {
        if (date) {
          var newDate, day, month, year;
          year = date.substr(0, 4);
          month = date.substr(5, 2);
          day = date.substr(8, 2);
          return newDate = day + '/' + month + '/' + year;
        }
      };

      for (var i = 0; i < requests.length; i++) {
        requests[i].createdAt = formatDate(requests[i].createdAt);
        requests[i].modifiedDate = formatDate(requests[i].modifiedDate);
      }
      this.requests = requests;
    });

  }

}
